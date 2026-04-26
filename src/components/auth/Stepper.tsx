import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  current: number;
  total: number;
  label: string;
}

export function Stepper({ current, total, label }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {Array.from({ length: total }).map((_, i) => {
          const step = i + 1;
          const done = step < current;
          const active = step === current;
          return (
            <div key={step} className="flex flex-1 items-center last:flex-none">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-[var(--transition-smooth)]",
                  done && "border-primary bg-primary text-primary-foreground",
                  active && "border-primary bg-background text-primary shadow-[var(--shadow-soft)]",
                  !done && !active && "border-border bg-background text-muted-foreground",
                )}
              >
                {done ? <Check className="h-4 w-4" /> : step}
              </div>
              {step < total && (
                <div className="mx-2 h-0.5 flex-1 overflow-hidden rounded-full bg-border">
                  <div
                    className={cn(
                      "h-full bg-primary transition-all duration-500",
                      done ? "w-full" : "w-0",
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-center text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
}
