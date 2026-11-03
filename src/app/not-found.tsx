import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl space-y-4 px-6 py-12">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p>This preview does not include that page.</p>
      <Link href="/" className="inline-flex min-h-11 items-center underline">
        Choose your academic context
      </Link>
    </main>
  );
}
