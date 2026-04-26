import { Logo } from "./Logo";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[image:var(--gradient-subtle)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, var(--primary) 0, transparent 40%), radial-gradient(circle at 80% 90%, var(--primary-glow) 0, transparent 40%)",
        }}
      />
      <main className="flex flex-1 flex-col items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <Logo />
          </div>
          <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-[var(--shadow-elegant)] backdrop-blur-sm sm:p-8">
            {children}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} VaultlyBank. Member FDIC. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}
