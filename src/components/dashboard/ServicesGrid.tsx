import {
  Banknote,
  Tv,
  Trophy,
  Gamepad2,
  Repeat,
  CreditCard,
  HeartHandshake,
  Grid3x3,
} from "lucide-react";

const services = [
  { label: "Loan", Icon: Banknote },
  { label: "TV", Icon: Tv },
  { label: "Betting", Icon: Trophy },
  { label: "Games", Icon: Gamepad2 },
  { label: "Subscriptions", Icon: Repeat },
  { label: "Card", Icon: CreditCard },
  { label: "Donate", Icon: HeartHandshake },
  { label: "More", Icon: Grid3x3 },
];

export function ServicesGrid() {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-foreground">
          Services
        </h3>
        <button type="button" className="text-xs font-medium text-primary hover:underline">
          Manage
        </button>
      </div>
      <ul className="grid grid-cols-4 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {services.map(({ label, Icon }) => (
          <li key={label}>
            <button
              type="button"
              className="group flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-primary)] p-2 text-primary-foreground shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/15 backdrop-blur-sm transition group-hover:bg-[var(--brand-accent)] group-hover:text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-semibold">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}