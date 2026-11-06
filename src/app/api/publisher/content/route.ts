import { NextResponse } from "next/server";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { withFirebaseUser } from "@/lib/firebase/server";
import { parseContentDraft } from "@/features/content/editor-schema";

const headers = { "Cache-Control": "no-store" };
function failure(error: unknown) {
  const unauthenticated =
    error instanceof Error && error.message === "UNAUTHENTICATED";
  return NextResponse.json(
    {
      error: unauthenticated
        ? "Please sign in again."
        : "Content is unavailable or you do not have publishing access to this department.",
    },
    { status: unauthenticated ? 401 : 403, headers },
  );
}
export async function GET(request: Request) {
  try {
    const departmentId =
      new URL(request.url).searchParams.get("departmentId") || "";
    if (!/^[a-z0-9-]{1,200}$/.test(departmentId))
      return NextResponse.json(
        { error: "Choose a department." },
        { status: 400 },
      );
    return await withFirebaseUser(request, async (db, uid) => {
      const membership = await getDoc(
        doc(db, "memberships", uid, "departments", departmentId),
      );
      if (membership.data()?.active !== true) throw new Error("FORBIDDEN");
      const results = await getDocs(
        query(
          collection(db, "content"),
          where("departmentId", "==", departmentId),
          limit(100),
        ),
      );
      return NextResponse.json(
        { items: results.docs.map((d) => ({ ...d.data(), id: d.id })) },
        { headers },
      );
    });
  } catch (error) {
    return failure(error);
  }
}
export async function POST(request: Request) {
  if (process.env.PUBLISHING_ENABLED !== "true")
    return NextResponse.json(
      { error: "Publishing is awaiting database setup and rule verification." },
      { status: 503, headers },
    );
  if (Number(request.headers.get("content-length")) > 40000)
    return NextResponse.json(
      { error: "Content is too large." },
      { status: 413 },
    );
  let input;
  let id: string | undefined;
  try {
    const raw = await request.text();
    if (raw.length > 40000)
      return NextResponse.json(
        { error: "Content is too large." },
        { status: 413 },
      );
    const payload = JSON.parse(raw);
    input = parseContentDraft(payload);
    if (payload.id !== undefined) {
      if (
        typeof payload.id !== "string" ||
        !/^[A-Za-z0-9_-]{1,100}$/.test(payload.id)
      )
        throw new Error("Invalid content ID.");
      id = payload.id;
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid content." },
      { status: 400 },
    );
  }
  const content = input;
  try {
    return await withFirebaseUser(request, async (db, uid) => {
      const ref = id ? doc(db, "content", id) : doc(collection(db, "content"));
      const auditRef = doc(collection(db, "publicationAudit"));
      await runTransaction(db, async (tx) => {
        const membership = await tx.get(
          doc(db, "memberships", uid, "departments", content.departmentId),
        );
        if (membership.data()?.active !== true) throw new Error("FORBIDDEN");
        const existing = id ? await tx.get(ref) : undefined;
        if (
          id &&
          (!existing?.exists() ||
            existing.data()?.departmentId !== content.departmentId)
        )
          throw new Error("FORBIDDEN");
        tx.set(ref, {
          ...content,
          authorId: existing?.data()?.authorId ?? uid,
          createdAt: existing?.data()?.createdAt ?? serverTimestamp(),
          updatedAt: serverTimestamp(),
          updatedBy: uid,
          auditId: auditRef.id,
        });
        tx.set(auditRef, {
          contentId: ref.id,
          departmentId: content.departmentId,
          actorId: uid,
          status: content.status,
          occurredAt: serverTimestamp(),
        });
      });
      return NextResponse.json({ id: ref.id }, { headers });
    });
  } catch (error) {
    return failure(error);
  }
}
