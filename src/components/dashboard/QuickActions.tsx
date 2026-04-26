import { ArrowDownLeft, ArrowUpRight, Clock } from "lucide-react";

const actions = [
  { label: "Send", Icon: ArrowUpRight },
  { label: "Receive", Icon: ArrowDownLeft },
  { label: "History", Icon: Clock },
];

export function QuickActions() {
  return (
    <section className="rounded-2xl border border-border/60 bg-card p-3 shadow-[var(--shadow-soft)] sm:p-4">
      <ul className="grid grid-cols-3 gap-2">
        {actions.map(({ label, Icon }) => (
          <li key={label}>
            <button
              type="button"
              className="group flex w-full flex-col items-center gap-2 rounded-xl px-2 py-3 transition hover:bg-accent"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)] transition group-hover:-translate-y-0.5 group-hover:shadow-[var(--shadow-elegant)]">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold text-foreground">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}