import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Wallet,
  Target,
  Lock,
  PiggyBank,
  TrendingUp,
  Banknote,
  ShieldCheck,
  Users,
  ArrowRight,
} from "lucide-react";
import { TopNav } from "@/components/dashboard/TopNav";
import { BottomNav } from "@/components/dashboard/BottomNav";

export const Route = createFileRoute("/finance")({
  head: () => ({
    meta: [
      { title: "Finance — VaultlyBank" },
      {
        name: "description",
        content:
          "Grow your money with VaultlyBank Savings products and access fast, flexible loans up to $2,000,000.",
      },
      { property: "og:title", content: "Finance — VaultlyBank" },
      {
        property: "og:description",
        content: "Savings, targets and loans built around your goals.",
      },
    ],
  }),
  component: FinancePage,
});

type Tab = "savings" | "loan";

function FinancePage() {
  const [tab, setTab] = useState<Tab>("savings");

  return (
    <div className="min-h-screen bg-[image:var(--gradient-subtle)] pb-28 sm:pb-32">
      <TopNav />

      <main className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-7">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Finance
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Grow, protect and borrow — all in one place.
            </p>
          </div>
          <button
            type="button"
            aria-label="Finance settings"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card text-foreground/70 shadow-[var(--shadow-soft)] transition hover:text-primary sm:flex"
          >
            <ShieldCheck className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-5 flex w-full items-center gap-2 rounded-full border border-border/60 bg-card p-1 shadow-[var(--shadow-soft)] sm:w-fit">
          {(["savings", "loan"] as const).map((id) => {
            const active = tab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`flex-1 rounded-full px-5 py-2 text-sm font-semibold capitalize transition sm:flex-none ${
                  active
                    ? "bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {id}
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          {tab === "savings" ? <SavingsView /> : <LoanView />}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

/* ----------------------------- Savings ----------------------------- */

const savingsProducts = [
  { label: "OWealth", Icon: Wallet, tag: null as string | null },
  { label: "Targets", Icon: Target, tag: "Hot" },
  { label: "SafeBox", Icon: PiggyBank, tag: null },
  { label: "Fixed", Icon: Lock, tag: null },
  { label: "Spend & Save", Icon: TrendingUp, tag: null },
];

function SavingsView() {
  const [hidden, setHidden] = useState(false);

  return (
    <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
      {/* Balance card */}
      <section className="lg:col-span-3 overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-5 text-primary-foreground shadow-[var(--shadow-elegant)] sm:p-7">
        <div className="grid gap-5 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground/80">
              Total Balance
              <button
                type="button"
                aria-label={hidden ? "Show balance" : "Hide balance"}
                onClick={() => setHidden((v) => !v)}
                className="rounded-full p-1 text-primary-foreground/80 transition hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                {hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                {hidden ? "••••••" : "$1,630"}
              </span>
              {!hidden && (
                <span className="text-xl font-bold text-primary-foreground/80">.06</span>
              )}
            </div>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-1 rounded-full bg-primary-foreground/10 px-3 py-1.5 text-xs font-semibold text-primary-foreground/90 transition hover:bg-primary-foreground/20"
            >
              View Assets Breakdown
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex items-start justify-between rounded-2xl bg-primary-foreground/10 p-4 backdrop-blur-sm lg:flex-col lg:items-stretch lg:justify-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
                Interest Credited Today
              </p>
              <p className="mt-1 text-2xl font-extrabold">$0.00</p>
            </div>
            <button
              type="button"
              aria-label="Interest details"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-accent)] text-primary transition hover:scale-105"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Products row */}
      <section className="lg:col-span-3">
        <ul className="grid grid-cols-5 gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-[var(--shadow-soft)] sm:gap-4">
          {savingsProducts.map(({ label, Icon, tag }) => (
            <li key={label}>
              <button
                type="button"
                className="group relative flex w-full flex-col items-center gap-2"
              >
                {tag && (
                  <span className="absolute -top-1 right-0 z-10 rounded-full bg-destructive px-1.5 py-0.5 text-[9px] font-bold text-destructive-foreground sm:right-2">
                    {tag}
                  </span>
                )}
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)] transition group-hover:-translate-y-0.5 group-hover:shadow-[var(--shadow-elegant)] sm:h-14 sm:w-14">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <span className="text-center text-[11px] font-semibold leading-tight text-foreground sm:text-xs">
                  {label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Promo banner */}
      <section
        className="relative overflow-hidden rounded-3xl p-5 sm:p-7 lg:col-span-2"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.97 0.04 95), oklch(0.92 0.08 80))",
        }}
      >
        <div
          aria-hidden
          className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[var(--brand-accent)]/30 blur-3xl"
        />
        <div className="relative">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3 w-3" /> Limited time
          </span>
          <h3 className="mt-3 text-2xl font-extrabold leading-tight text-primary sm:text-3xl">
            Smart Savings Target
          </h3>
          <p className="mt-2 max-w-md text-sm font-medium text-primary/80">
            Set a goal, automate deposits and earn up to 15% p.a. — no regrets, just rewards.
          </p>
          <button
            type="button"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-90"
          >
            Start Saving Now
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-primary/70">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Licensed
            </span>
            <span>Insured</span>
            <span>Powered by VaultlyBank</span>
          </div>
        </div>
      </section>

      {/* Side cards */}
      <div className="grid gap-4 lg:col-span-1">
        <article className="rounded-3xl border border-border/60 bg-card p-5 shadow-[var(--shadow-soft)]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <h4 className="mt-3 text-lg font-extrabold text-primary">Find a Target</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            Join <span className="font-bold text-foreground">9M+</span> members saving together.
          </p>
          <button
            type="button"
            className="mt-4 inline-flex items-center gap-1 rounded-full bg-[image:var(--gradient-primary)] px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Join Now
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </article>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
          <article className="rounded-3xl border border-border/60 bg-card p-5 shadow-[var(--shadow-soft)]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <PiggyBank className="h-4.5 w-4.5" />
            </div>
            <h4 className="mt-3 text-base font-extrabold text-primary">SafeBox</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Flexible savings with up to <span className="font-bold text-foreground">15% p.a.</span>
            </p>
          </article>
          <article className="rounded-3xl border border-border/60 bg-card p-5 shadow-[var(--shadow-soft)]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Lock className="h-4 w-4" />
            </div>
            <h4 className="mt-3 text-base font-extrabold text-primary">Fixed</h4>
            <p className="mt-1 text-xs text-muted-foreground">Save for the rainy day.</p>
          </article>
        </div>
      </div>

      <p className="lg:col-span-3 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-primary" />
        OWealth and Savings are powered by VaultlyBank Ltd.
      </p>
    </div>
  );
}

/* ------------------------------- Loan ------------------------------- */

function LoanView() {
  return (
    <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
      <section className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-6 text-primary-foreground shadow-[var(--shadow-elegant)] sm:p-8 lg:col-span-2">
        <div
          aria-hidden
          className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[var(--brand-accent)]/30 blur-3xl"
        />
        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand-accent)] text-primary">
              <Banknote className="h-5 w-5" />
            </span>
            <span className="text-lg font-extrabold tracking-tight">EaseMoni</span>
          </div>

          <div className="mt-8 rounded-3xl bg-primary-foreground/10 p-5 backdrop-blur-sm sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
              Get a loan up to
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
              <span className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                $2,000,000
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-accent)] px-6 py-2.5 text-sm font-bold text-primary shadow-[var(--shadow-soft)] transition hover:scale-105"
              >
                Apply
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <p className="mt-5 text-xs text-primary-foreground/70">
            All loan services are powered by VaultlyBank Ltd.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-border/60 bg-card p-5 shadow-[var(--shadow-soft)] sm:p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-foreground">
          Why borrow with us
        </h3>
        <ul className="mt-4 space-y-3 text-sm">
          {[
            { label: "Instant approval in minutes", Icon: TrendingUp },
            { label: "Flexible repayment terms", Icon: Lock },
            { label: "Bank-grade security", Icon: ShieldCheck },
          ].map(({ label, Icon }) => (
            <li key={label} className="flex items-center gap-3 rounded-2xl bg-accent/40 px-3 py-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <span className="font-medium text-foreground">{label}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}