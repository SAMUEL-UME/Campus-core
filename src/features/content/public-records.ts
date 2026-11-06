import "server-only";
import { initializeServerApp, deleteApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { demoContent, type DemoRecord } from "@/data/demo-content";
import { parseContentDraft } from "./editor-schema";

export async function publicRecords(
  departmentId: string,
): Promise<readonly DemoRecord[]> {
  if (process.env.CONTENT_SOURCE !== "firestore") return demoContent;
  const app = initializeServerApp(
    {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    },
    {},
  );
  try {
    const snapshot = await getDocs(
      query(
        collection(getFirestore(app), "content"),
        where("departmentId", "==", departmentId),
        where("status", "==", "published"),
        limit(100),
      ),
    );
    return snapshot.docs
      .flatMap((record) => {
        try {
          const raw = record.data();
          const item = parseContentDraft(raw);
          if (!(raw.updatedAt instanceof Timestamp)) return [];
          return [
            {
              id: record.id,
              kind: item.kind,
              departmentId: item.departmentId,
              levels: item.levels,
              title: item.title,
              summary: item.summary,
              category: item.category,
              body: item.body.split(/\n\s*\n/),
              source: item.source,
              publishedAt: raw.updatedAt.toDate().toISOString(),
              isDemo: false,
              resourceUrl: item.resourceUrl,
              ...(item.kind === "events"
                ? {
                    event: {
                      startsAt: item.startsAt,
                      endsAt: item.endsAt,
                      venue: item.venue,
                      organizer: item.organizer,
                      status: item.eventStatus,
                      timezone: "Africa/Lagos",
                    },
                  }
                : {}),
            },
          ];
        } catch {
          return [];
        }
      })
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  } finally {
    await deleteApp(app);
  }
}
