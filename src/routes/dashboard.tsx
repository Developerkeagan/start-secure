import { createFileRoute } from "@tanstack/react-router";
import { TopNav } from "@/components/dashboard/TopNav";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ServicesGrid } from "@/components/dashboard/ServicesGrid";
import { AdsBanner } from "@/components/dashboard/AdsBanner";
import { BottomNav } from "@/components/dashboard/BottomNav";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — VaultlyBank" },
      {
        name: "description",
        content:
          "Manage your dollar, euro and crypto accounts, send and receive money, and access banking services.",
      },
      { property: "og:title", content: "Dashboard — VaultlyBank" },
      {
        property: "og:description",
        content: "Your accounts, balances and quick actions in one place.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="min-h-screen bg-[image:var(--gradient-subtle)] pb-28 sm:pb-32">
      <TopNav />

      <main className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-7">
        {/* Mobile: stacked. PC: account spans full width on top, quick actions + ads side by side, services full width */}
        <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          <div className="lg:col-span-3">
            <AccountCard />
          </div>

          <div className="lg:col-span-1">
            <QuickActions />
          </div>

          <div className="lg:col-span-2">
            <AdsBanner />
          </div>

          <div className="lg:col-span-3">
            <ServicesGrid />
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}