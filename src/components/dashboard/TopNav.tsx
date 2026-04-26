import { Link } from "@tanstack/react-router";
import { Bell, Headphones, QrCode, User } from "lucide-react";
import { Logo } from "@/components/auth/Logo";

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/40 bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/15 ring-2 ring-primary-foreground/30 backdrop-blur-sm transition hover:bg-primary-foreground/25"
            aria-label="Profile"
          >
            <User className="h-5 w-5" />
          </Link>
          <div className="hidden sm:block">
            <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70">Welcome back</p>
            <p className="text-sm font-semibold">Alex Morgan</p>
          </div>
          <div className="ml-2 hidden md:block">
            <Logo subtitle="" />
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <NavIconButton label="Care line">
            <Headphones className="h-5 w-5" />
          </NavIconButton>
          <NavIconButton label="Notifications" badge={3}>
            <Bell className="h-5 w-5" />
          </NavIconButton>
          <NavIconButton label="Scan QR code">
            <QrCode className="h-5 w-5" />
          </NavIconButton>
        </div>
      </div>
    </header>
  );
}

function NavIconButton({
  children,
  label,
  badge,
}: {
  children: React.ReactNode;
  label: string;
  badge?: number;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition hover:bg-primary-foreground/20"
    >
      {children}
      {badge ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--brand-accent)] px-1 text-[10px] font-bold text-primary">
          {badge}
        </span>
      ) : null}
    </button>
  );
}