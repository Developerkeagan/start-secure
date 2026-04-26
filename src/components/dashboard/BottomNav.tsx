import { Link, useLocation } from "@tanstack/react-router";
import { Home, Wallet, Users, Settings } from "lucide-react";

const items = [
  { to: "/dashboard", label: "Home", Icon: Home },
  { to: "/finance", label: "Finance", Icon: Wallet },
  { to: "/people", label: "People", Icon: Users },
  { to: "/settings", label: "Settings", Icon: Settings },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:bottom-6"
    >
      <ul className="pointer-events-auto flex items-center gap-1 rounded-full border border-primary-foreground/10 bg-[image:var(--gradient-primary)] p-1.5 shadow-[var(--shadow-elegant)] backdrop-blur-md">
        {items.map(({ to, label, Icon }) => {
          const isActive = pathname === to;
          return (
            <li key={to}>
              <Link
                to={to}
                aria-label={label}
                className={`flex h-11 items-center justify-center gap-1.5 rounded-full px-3 transition sm:px-4 ${
                  isActive
                    ? "bg-primary-foreground text-primary shadow-sm"
                    : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="hidden text-xs font-semibold sm:inline">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}