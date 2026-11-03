import { StudentPage } from "@/features/discovery/student-page";
import type { Query } from "@/features/discovery/context";

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  return <StudentPage query={await searchParams} section="resources" />;
}
