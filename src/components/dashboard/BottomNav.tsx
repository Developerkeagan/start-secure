import { useState } from "react";
import { Home, PieChart, Plus, CreditCard, Settings } from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  Icon: typeof Home;
  primary?: boolean;
};

const items: NavItem[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "stats", label: "Stats", Icon: PieChart },
  { id: "add", label: "Add", Icon: Plus, primary: true },
  { id: "cards", label: "Cards", Icon: CreditCard },
  { id: "settings", label: "Settings", Icon: Settings },
];

export function BottomNav() {
  const [active, setActive] = useState<string>("home");

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:bottom-6"
    >
      <ul className="pointer-events-auto flex items-center gap-1 rounded-full border border-primary-foreground/10 bg-[image:var(--gradient-primary)] p-1.5 shadow-[var(--shadow-elegant)] backdrop-blur-md">
        {items.map(({ id, label, Icon, primary }) => {
          const isActive = active === id;
          if (primary) {
            return (
              <li key={id}>
                <button
                  type="button"
                  aria-label={label}
                  onClick={() => setActive(id)}
                  className="-my-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-accent)] text-primary shadow-[var(--shadow-elegant)] ring-4 ring-background/40 transition hover:scale-105"
                >
                  <Icon className="h-5 w-5" />
                </button>
              </li>
            );
          }
          return (
            <li key={id}>
              <button
                type="button"
                aria-label={label}
                onClick={() => setActive(id)}
                className={`flex h-11 w-11 flex-col items-center justify-center rounded-full transition sm:w-auto sm:flex-row sm:gap-1.5 sm:px-4 ${
                  isActive
                    ? "bg-primary-foreground text-primary"
                    : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="hidden text-xs font-semibold sm:inline">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}