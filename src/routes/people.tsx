import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { TopNav } from "@/components/dashboard/TopNav";
import { BottomNav } from "@/components/dashboard/BottomNav";

export const Route = createFileRoute("/people")({
  head: () => ({
    meta: [
      { title: "People — VaultlyBank" },
      { name: "description", content: "Send money to friends and manage your beneficiaries." },
    ],
  }),
  component: PeoplePage,
});

function PeoplePage() {
  return (
    <div className="min-h-screen bg-[image:var(--gradient-subtle)] pb-28 sm:pb-32">
      <TopNav />
      <main className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-7">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          People
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your beneficiaries and contacts will live here.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/50 p-10 text-center">
          <Users className="h-10 w-10 text-primary" />
          <p className="mt-3 text-sm font-medium text-muted-foreground">
            Coming soon.
          </p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}