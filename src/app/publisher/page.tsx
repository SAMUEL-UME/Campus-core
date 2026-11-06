"use client";
import Link from "next/link";
import { useState } from "react";
import { academicTaxonomy } from "@/data/academic-taxonomy";
import { getFirebaseClient } from "@/lib/firebase/client";
import type { ContentDraft } from "@/features/content/editor-schema";

const empty: ContentDraft = {
  departmentId: "",
  kind: "announcements",
  status: "draft",
  title: "",
  summary: "",
  body: "",
  category: "Academic",
  source: "",
  levels: [],
  resourceUrl: "",
  startsAt: "",
  endsAt: "",
  venue: "",
  organizer: "",
  eventStatus: "Scheduled",
};
type Editable = ContentDraft & { id?: string };
export default function PublisherPage() {
  const [draft, setDraft] = useState<Editable>(empty);
  const [items, setItems] = useState<Editable[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function call(method: "GET" | "POST") {
    setBusy(true);
    setMessage("");
    try {
      const auth = getFirebaseClient().auth;
      await auth.authStateReady();
      if (!auth.currentUser)
        throw new Error("Sign in before opening your publishing workspace.");
      const token = await auth.currentUser.getIdToken();
      const response = await fetch(
        `/api/publisher/content?departmentId=${encodeURIComponent(draft.departmentId)}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          ...(method === "POST" ? { body: JSON.stringify(draft) } : {}),
        },
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Unable to complete this request.");
      if (method === "GET") {
        setItems(data.items);
        setMessage(`${data.items.length} items loaded (up to 100).`);
      } else {
        setDraft({ ...draft, id: data.id });
        setMessage(
          `Saved as ${draft.status}. Reload your department content to see the latest list.`,
        );
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to connect. Try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  function field(key: keyof ContentDraft, label: string, multiline = false) {
    return (
      <label className="grid gap-2 text-sm font-semibold">
        {label}
        {multiline ? (
          <textarea
            required
            rows={key === "body" ? 8 : 3}
            value={String(draft[key])}
            onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
            className="rounded-lg border border-border p-3"
          />
        ) : (
          <input
            value={String(draft[key])}
            onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
            className="min-h-11 rounded-lg border border-border p-3"
          />
        )}
      </label>
    );
  }
  return (
    <div className="welcome">
      <header className="welcome-nav">
        <Link href="/" className="wordmark">
          Campus Core.
        </Link>
        <Link href="/sign-in">Account</Link>
      </header>
      <main id="main-content" className="mx-auto max-w-3xl space-y-6 py-10">
        <span className="eyebrow">PUBLISHER WORKSPACE</span>
        <h1 className="text-3xl font-bold">Your department’s next update.</h1>
        <p className="text-muted-foreground">
          Publishing is available to manually approved department publishers.
          Signing in does not grant access.
        </p>
        <label className="grid gap-2">
          Department
          <select
            value={draft.departmentId}
            disabled={busy}
            onChange={(e) => {
              setDraft({ ...empty, departmentId: e.target.value });
              setItems([]);
              setMessage("");
            }}
            className="min-h-11 rounded-lg border border-border p-3"
          >
            <option value="">Choose a department</option>
            {academicTaxonomy.departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
        <div className="flex gap-4">
          <button
            disabled={busy || !draft.departmentId}
            onClick={() => call("GET")}
            className="welcome-button"
          >
            Load department content
          </button>
          <button
            disabled={busy}
            onClick={() =>
              setDraft({ ...empty, departmentId: draft.departmentId })
            }
          >
            New item
          </button>
        </div>
        {message && (
          <p role="status" className="rounded-lg bg-muted p-4">
            {message}
          </p>
        )}
        {items.length > 0 && (
          <section aria-label="Department content" className="grid gap-2">
            {items.map((item) => (
              <button
                disabled={busy}
                className="rounded-lg border border-border bg-card p-4 text-left"
                key={item.id}
                onClick={() => setDraft(item)}
              >
                {item.title}{" "}
                <span className="text-xs">
                  · {item.status} · {item.kind}
                </span>
              </button>
            ))}
          </section>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void call("POST");
          }}
          className="space-y-5 rounded-2xl border border-border bg-card p-6"
        >
          <fieldset disabled={busy} className="space-y-5">
            <legend className="mb-4 text-xl font-semibold">
              {draft.id ? "Edit content" : "Create content"}
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                Content type
                <select
                  className="min-h-11 border border-border p-2"
                  value={draft.kind}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      kind: e.target.value as ContentDraft["kind"],
                    })
                  }
                >
                  {["announcements", "resources", "events"].map((k) => (
                    <option key={k}>{k}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2">
                Publication status
                <select
                  className="min-h-11 border border-border p-2"
                  value={draft.status}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      status: e.target.value as ContentDraft["status"],
                    })
                  }
                >
                  {["draft", "published", "archived"].map((k) => (
                    <option key={k}>{k}</option>
                  ))}
                </select>
              </label>
            </div>
            {field("title", "Title")}
            {field("summary", "Short summary", true)}
            {field("body", "Full content", true)}
            {field("category", "Category")}
            {field("source", "Source / attribution")}
            <fieldset>
              <legend className="mb-2 font-semibold">
                Audience levels (leave empty for all)
              </legend>
              <div className="flex flex-wrap gap-4">
                {academicTaxonomy.levels
                  .filter((l) => l.departmentId === draft.departmentId)
                  .map((l) => (
                    <label key={l.id}>
                      <input
                        type="checkbox"
                        checked={draft.levels.includes(l.id)}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            levels: e.target.checked
                              ? [...draft.levels, l.id]
                              : draft.levels.filter((v) => v !== l.id),
                          })
                        }
                      />{" "}
                      {l.name}
                    </label>
                  ))}
              </div>
            </fieldset>
            {draft.kind === "resources" &&
              field("resourceUrl", "Reviewed resource link (HTTPS, optional)")}
            {draft.kind === "events" && (
              <>
                {field(
                  "startsAt",
                  "Start date/time with timezone (e.g. 2026-11-06T14:00:00+01:00)",
                )}
                {field("endsAt", "End date/time with timezone")}
                {field("venue", "Venue")}
                {field("organizer", "Organizer")}
                <label className="grid gap-2">
                  Event status
                  <select
                    value={draft.eventStatus}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        eventStatus: e.target
                          .value as ContentDraft["eventStatus"],
                      })
                    }
                  >
                    <option>Scheduled</option>
                    <option>Cancelled</option>
                  </select>
                </label>
              </>
            )}
            <button
              disabled={busy || !draft.departmentId}
              className="welcome-button"
              type="submit"
            >
              {busy ? "Saving…" : `Save ${draft.status}`}
            </button>
          </fieldset>
        </form>
      </main>
    </div>
  );
}
