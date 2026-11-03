"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className="mx-auto max-w-3xl space-y-4 px-6 py-12">
      <h1 className="text-2xl font-bold">We couldn’t load this campus view</h1>
      <p role="alert">
        Your selection remains in the address bar. Try again without changing
        it.
      </p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
