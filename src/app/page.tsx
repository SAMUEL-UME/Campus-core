import { redirect } from "next/navigation";
import { type Query } from "@/features/discovery/context";
import HomepageContent from "@/pages/HomepageContent";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const query = await searchParams;
  const keys = ["university", "faculty", "department", "level"] as const;
  if (keys.some((key) => query[key] !== undefined)) {
    const params = new URLSearchParams();
    for (const key of keys) {
      const value = query[key];
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item));
      } else if (value !== undefined) {
        params.set(key, value);
      }
    }
    redirect(`/dashboard?${params}`);
  }

  return <HomepageContent />;
}
