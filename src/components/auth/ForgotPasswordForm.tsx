import { useState } from "react";
import { ChevronLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ForgotPasswordForm({ onBack }: { onBack: () => void }) {
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Reset link sent to your email");
      onBack();
    }, 800);
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ChevronLeft className="h-4 w-4" /> Back to login
      </button>

      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold text-foreground">Forgot Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and we'll send you a reset link
        </p>
      </div>

      <div className="flex items-center gap-3 border-b border-border pb-2 transition-colors focus-within:border-primary">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send reset link"}
      </Button>
    </form>
  );
}
