import { StudentPage } from "@/features/discovery/student-page";
import type { Query } from "@/features/discovery/context";
export default async function EventDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Query>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  return <StudentPage query={query} section="events" detailId={id} />;
}
