import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { before, beforeEach, after, test } from "node:test";
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} from "@firebase/rules-unit-testing";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  writeBatch,
  serverTimestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Always use an isolated demo project and a local emulator, never production credentials.
const emulator = process.env.FIRESTORE_EMULATOR_HOST;
assert.ok(
  emulator && /^(127\.0\.0\.1|localhost):\d+$/.test(emulator),
  "Start the local Firestore emulator before running these tests.",
);
const [host, port] = emulator.split(":");
let env;
before(async () => {
  env = await initializeTestEnvironment({
    projectId: "demo-campus-core",
    firestore: {
      host,
      port: Number(port),
      rules: readFileSync(
        new URL("../firestore.rules", import.meta.url),
        "utf8",
      ),
    },
  });
});
beforeEach(async () => {
  await env.clearFirestore();
});
after(async () => {
  await env?.cleanup();
});
const db = (uid) =>
  uid
    ? env.authenticatedContext(uid).firestore()
    : env.unauthenticatedContext().firestore();
const profile = () => ({
  university: "unizik",
  faculty: "unizik-physical-sciences",
  department: "unizik-physical-sciences-computer-science",
  level: "200",
  updatedAt: serverTimestamp(),
});
async function seed(path, data) {
  await env.withSecurityRulesDisabled((c) =>
    setDoc(doc(c.firestore(), path), data),
  );
}
async function publisher(
  uid = "publisher",
  department = "department-a",
  active = true,
) {
  await seed(`memberships/${uid}/departments/${department}`, {
    active,
    allowedLevels: ["100", "200"],
  });
}
const content = (
  uid = "publisher",
  departmentId = "department-a",
  status = "draft",
  auditId = "audit-one",
) => ({
  departmentId,
  kind: "announcements",
  status,
  title: "Fictional notice",
  summary: "Test summary",
  body: "Original fictional test content.",
  category: "Academic",
  source: "Test publisher",
  levels: ["200"],
  resourceUrl: "",
  startsAt: "",
  endsAt: "",
  venue: "",
  organizer: "",
  eventStatus: "Scheduled",
  authorId: uid,
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
  updatedBy: uid,
  auditId,
});
function publishBatch(database, data, id = "notice-one") {
  const batch = writeBatch(database);
  batch.set(doc(database, "content", id), data);
  batch.set(doc(database, "publicationAudit", data.auditId), {
    contentId: id,
    departmentId: data.departmentId,
    actorId: data.updatedBy,
    status: data.status,
    occurredAt: serverTimestamp(),
  });
  return batch.commit();
}
test("student can save and read their own private profile", async () => {
  const own = db("student-a");
  await assertSucceeds(
    setDoc(doc(own, "studentProfiles", "student-a"), profile()),
  );
  const saved = await assertSucceeds(
    getDoc(doc(own, "studentProfiles", "student-a")),
  );
  assert.equal(saved.data().level, "200");
  await assertSucceeds(
    setDoc(doc(own, "studentProfiles", "student-a"), {
      ...profile(),
      level: "100",
    }),
  );
});
test("anonymous and another student cannot access the profile", async () => {
  await seed("studentProfiles/student-a", {
    ...profile(),
    updatedAt: new Date(),
  });
  for (const uid of [undefined, "student-b"]) {
    await assertFails(getDoc(doc(db(uid), "studentProfiles", "student-a")));
    await assertFails(
      setDoc(doc(db(uid), "studentProfiles", "student-a"), profile()),
    );
  }
});
test("profile cannot grant a role or accept oversized or incomplete fields", async () => {
  const ref = doc(db("student-a"), "studentProfiles", "student-a");
  await assertFails(setDoc(ref, { ...profile(), role: "admin" }));
  await assertFails(setDoc(ref, { ...profile(), department: "x".repeat(201) }));
  await assertFails(
    setDoc(ref, { level: "200", updatedAt: serverTimestamp() }),
  );
  await assertFails(setDoc(ref, { ...profile(), updatedAt: new Date(0) }));
});
test("students cannot enumerate profiles, delete accounts, or assign publishing membership", async () => {
  const own = db("student-a");
  await assertFails(getDocs(collection(own, "studentProfiles")));
  await assertFails(deleteDoc(doc(own, "studentProfiles", "student-a")));
  await assertFails(
    setDoc(
      doc(own, "memberships", "student-a", "departments", "department-a"),
      { active: true, allowedLevels: ["200"] },
    ),
  );
});
test("anonymous and ordinary students cannot publish", async () => {
  for (const uid of [undefined, "student-a"])
    await assertFails(publishBatch(db(uid), content(uid || "anonymous")));
});
test("approved publisher can atomically create a draft and audit entry", async () => {
  await publisher();
  const own = db("publisher");
  await assertSucceeds(publishBatch(own, content()));
  const saved = await assertSucceeds(getDoc(doc(own, "content", "notice-one")));
  assert.equal(saved.data().status, "draft");
});
test("publisher cannot write another department, unsupported levels, or forged attribution", async () => {
  await publisher();
  const own = db("publisher");
  await assertFails(publishBatch(own, content("publisher", "department-b")));
  await assertFails(publishBatch(own, { ...content(), levels: ["900"] }));
  await assertFails(
    publishBatch(own, { ...content(), authorId: "someone-else" }),
  );
  await assertFails(
    publishBatch(own, { ...content(), updatedBy: "someone-else" }),
  );
});
test("publication requires an audit and rejects invalid content fields", async () => {
  await publisher();
  const own = db("publisher");
  await assertFails(setDoc(doc(own, "content", "notice-one"), content()));
  await assertFails(publishBatch(own, { ...content(), title: "" }));
  await assertFails(
    publishBatch(own, { ...content(), resourceUrl: "javascript:alert(1)" }),
  );
  await assertFails(publishBatch(own, { ...content(), status: "unreviewed" }));
});
test("only published content is public, including constrained queries", async () => {
  await publisher();
  const own = db("publisher");
  await publishBatch(own, content());
  const publicDb = db();
  await assertFails(getDoc(doc(publicDb, "content", "notice-one")));
  await assertFails(getDocs(collection(publicDb, "content")));
  await publishBatch(
    own,
    content("publisher", "department-a", "published", "audit-two"),
    "notice-two",
  );
  const publicRecord = await assertSucceeds(
    getDoc(doc(publicDb, "content", "notice-two")),
  );
  assert.equal(publicRecord.data().title, "Fictional notice");
  const list = await assertSucceeds(
    getDocs(
      query(
        collection(publicDb, "content"),
        where("departmentId", "==", "department-a"),
        where("status", "==", "published"),
      ),
    ),
  );
  assert.equal(list.size, 1);
});
test("publisher can archive a notice; anonymous access stops immediately", async () => {
  await publisher();
  const own = db("publisher");
  await publishBatch(own, content("publisher", "department-a", "published"));
  const original = (await getDoc(doc(own, "content", "notice-one"))).data();
  await assertSucceeds(
    publishBatch(own, {
      ...original,
      status: "archived",
      updatedAt: serverTimestamp(),
      auditId: "audit-two",
    }),
  );
  await assertFails(getDoc(doc(db(), "content", "notice-one")));
});
test("revoked publisher cannot read private content or write new content", async () => {
  await publisher();
  const own = db("publisher");
  await publishBatch(own, content());
  await publisher("publisher", "department-a", false);
  await assertFails(getDoc(doc(own, "content", "notice-one")));
  await assertFails(
    publishBatch(
      own,
      content("publisher", "department-a", "draft", "audit-two"),
      "notice-two",
    ),
  );
});
test("author and department are immutable, and audit entries cannot be edited", async () => {
  await publisher();
  await publisher("publisher", "department-b");
  const own = db("publisher");
  await publishBatch(own, content());
  const original = (await getDoc(doc(own, "content", "notice-one"))).data();
  await assertFails(
    publishBatch(own, {
      ...original,
      authorId: "someone-else",
      updatedAt: serverTimestamp(),
      auditId: "audit-two",
    }),
  );
  await assertFails(
    publishBatch(own, {
      ...original,
      departmentId: "department-b",
      updatedAt: serverTimestamp(),
      auditId: "audit-three",
    }),
  );
  await assertFails(
    updateDoc(doc(own, "publicationAudit", "audit-one"), {
      status: "published",
    }),
  );
  await assertFails(deleteDoc(doc(own, "publicationAudit", "audit-one")));
});
