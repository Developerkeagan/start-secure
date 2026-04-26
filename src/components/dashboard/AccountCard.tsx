import { ChevronRight, DollarSign, Euro, Bitcoin, Wallet } from "lucide-react";

const accounts = [
  { label: "Dollar Account", value: "$12,000.20", Icon: DollarSign },
  { label: "Euro Account", value: "€900.20", Icon: Euro },
  { label: "Crypto Account", value: "7,000.20 USDT", Icon: Bitcoin },
];

export function AccountCard() {
  return (
    <section className="rounded-3xl bg-[image:var(--gradient-primary)] p-5 text-primary-foreground shadow-[var(--shadow-elegant)] sm:p-7">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground/90">
          Account
        </h2>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary-foreground/80 transition hover:text-primary-foreground"
        >
          Recent transactions
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <ul className="mt-5 space-y-3 lg:grid lg:grid-cols-3 lg:gap-4 lg:space-y-0">
        {accounts.map(({ label, value, Icon }) => (
          <li
            key={label}
            className="flex items-center justify-between rounded-2xl bg-primary-foreground/10 px-4 py-3 backdrop-blur-sm lg:flex-col lg:items-start lg:gap-3 lg:py-4"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-accent)] text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
                {label}
              </span>
            </div>
            <span className="text-base font-bold lg:text-xl">{value}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col items-center gap-1 border-t border-primary-foreground/15 pt-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary-foreground/70">
          Total Balance
        </span>
        <div className="flex items-center gap-2">
          <Wallet className="h-6 w-6 text-[var(--brand-accent)]" />
          <span className="text-3xl font-extrabold tracking-tight sm:text-4xl">$19,900.20</span>
        </div>
      </div>
    </section>
  );
}