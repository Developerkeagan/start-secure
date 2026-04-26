import { Sparkles } from "lucide-react";

export function AdsBanner() {
  return (
    <section
      className="relative overflow-hidden rounded-2xl p-5 sm:p-6"
      style={{ background: "linear-gradient(135deg, var(--brand-accent), oklch(0.88 0.13 90))" }}
    >
      <div
        aria-hidden
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl"
      />
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3 w-3" /> Featured
          </span>
          <h4 className="mt-2 text-lg font-extrabold leading-tight text-primary sm:text-xl">
            Earn 5% cashback on every card swipe
          </h4>
          <p className="mt-1 text-xs font-medium text-primary/80 sm:text-sm">
            Activate your Vaultly Platinum card today.
          </p>
          <button
            type="button"
            className="mt-3 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            Learn more
          </button>
        </div>
        <div className="hidden h-20 w-32 shrink-0 rotate-6 rounded-xl bg-[image:var(--gradient-primary)] shadow-[var(--shadow-elegant)] sm:block" />
      </div>
    </section>
  );
}