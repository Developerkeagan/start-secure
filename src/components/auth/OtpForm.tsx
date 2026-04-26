import { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function OtpForm({ onVerified, contact = "your email" }: { onVerified: () => void; contact?: string }) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(45);
  const [loading, setLoading] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const handleChange = (i: number, v: string) => {
    const val = v.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const txt = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!txt) return;
    e.preventDefault();
    const next = ["", "", "", "", "", ""];
    txt.split("").forEach((c, i) => (next[i] = c));
    setDigits(next);
    refs.current[Math.min(txt.length, 5)]?.focus();
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (digits.some((d) => !d)) {
      toast.error("Enter all 6 digits");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Account verified! Welcome to VaultlyBank");
      onVerified();
    }, 800);
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
          <ShieldCheck className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Verify your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            We sent a 6-digit code to {contact}
          </p>
        </div>
      </div>

      <div className="flex justify-between gap-2" onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            value={d}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKey(i, e)}
            inputMode="numeric"
            maxLength={1}
            className="h-14 w-12 rounded-xl border-2 border-border bg-background text-center text-xl font-bold text-foreground outline-none transition-colors focus:border-primary focus:shadow-[var(--shadow-soft)]"
          />
        ))}
      </div>

      <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading}>
        {loading ? "Verifying..." : "Verify & Continue"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Didn't receive code?{" "}
        {seconds > 0 ? (
          <span className="font-medium text-foreground">Resend in {seconds}s</span>
        ) : (
          <button
            type="button"
            onClick={() => {
              setSeconds(45);
              toast.success("New code sent");
            }}
            className="font-semibold text-primary hover:text-primary-glow"
          >
            Resend code
          </button>
        )}
      </p>
    </form>
  );
}
