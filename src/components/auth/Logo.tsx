export function Logo({ subtitle = "SECURE BANKING" }: { subtitle?: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] shadow-[var(--shadow-soft)]">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-primary-foreground">
            <path d="M3 10L12 4L21 10V11H3V10Z" fill="currentColor" />
            <path d="M5 12V18M9 12V18M15 12V18M19 12V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <span className="text-3xl font-bold tracking-tight text-foreground">
          Vaultly<span className="text-primary-glow">Bank</span>
        </span>
      </div>
      <span className="text-xs font-medium tracking-[0.25em] text-muted-foreground">{subtitle}</span>
    </div>
  );
}
