import { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  onForgot: () => void;
  onSignup: () => void;
}

export function LoginForm({ onForgot, onSignup }: Props) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Welcome back!");
    }, 800);
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Sign in</h1>
        <p className="text-sm text-muted-foreground">Access your secure account</p>
      </div>

      <div className="space-y-5">
        <FloatingInput icon={<User className="h-4 w-4" />} type="text" placeholder="Username" />
        <FloatingInput
          icon={<Lock className="h-4 w-4" />}
          type={show ? "text" : "password"}
          placeholder="Password"
          rightSlot={
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onForgot}
          className="text-sm font-medium text-primary transition-colors hover:text-primary-glow"
        >
          Forgot password?
        </button>
      </div>

      <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSignup}
          className="font-semibold text-primary transition-colors hover:text-primary-glow"
        >
          Create one
        </button>
      </p>
    </form>
  );
}

function FloatingInput({
  icon,
  rightSlot,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div className="group relative flex items-center gap-3 border-b border-border pb-2 transition-colors focus-within:border-primary">
      {icon && <span className="text-muted-foreground group-focus-within:text-primary">{icon}</span>}
      <input
        {...rest}
        className="flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
      />
      {rightSlot}
    </div>
  );
}
