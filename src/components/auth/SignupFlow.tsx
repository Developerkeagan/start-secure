import { useState } from "react";
import { ChevronLeft, User, Phone, Mail, Upload, FileCheck2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stepper } from "./Stepper";
import { FaceScan } from "./FaceScan";
import { toast } from "sonner";

const STEP_LABELS = [
  "Personal Info",
  "Phone Number",
  "Email Address",
  "ID Verification",
  "Face Verification",
];

interface SignupData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  license: File | null;
  face: string | null;
}

interface Props {
  onBackToLogin: () => void;
  onComplete: (email: string) => void;
}

export function SignupFlow({ onBackToLogin, onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    license: null,
    face: null,
  });

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => (step === 1 ? onBackToLogin() : setStep((s) => s - 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!data.firstName.trim() || !data.lastName.trim()) {
        toast.error("Enter your full name");
        return;
      }
      next();
    } else if (step === 2) {
      if (!/^\+?[0-9\s-]{8,}$/.test(data.phone)) {
        toast.error("Enter a valid phone number");
        return;
      }
      next();
    } else if (step === 3) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        toast.error("Enter a valid email");
        return;
      }
      next();
    } else if (step === 4) {
      if (!data.license) {
        toast.error("Upload your driver's license");
        return;
      }
      next();
    }
  };

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={back}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ChevronLeft className="h-4 w-4" /> {step === 1 ? "Back to login" : "Back"}
      </button>

      <Stepper current={step} total={5} label={STEP_LABELS[step - 1]} />

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-5">
            <Field icon={<User className="h-4 w-4" />}>
              <input
                value={data.firstName}
                onChange={(e) => setData({ ...data, firstName: e.target.value })}
                placeholder="First name"
                className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
              />
            </Field>
            <Field icon={<User className="h-4 w-4" />}>
              <input
                value={data.lastName}
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
                placeholder="Last name"
                className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <Field icon={<Phone className="h-4 w-4" />}>
            <input
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              type="tel"
              className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
            />
          </Field>
        )}

        {step === 3 && (
          <Field icon={<Mail className="h-4 w-4" />}>
            <input
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="you@example.com"
              type="email"
              className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
            />
          </Field>
        )}

        {step === 4 && (
          <LicenseUpload
            file={data.license}
            onChange={(f) => setData({ ...data, license: f })}
          />
        )}

        {step === 5 && (
          <FaceScan
            onCapture={(face) => {
              setData({ ...data, face });
              toast.success("Verification complete. Sending OTP...");
              onComplete(data.email);
            }}
          />
        )}

        {step < 5 && (
          <Button type="submit" variant="hero" size="xl" className="w-full">
            {step === 4 ? "Verify ID" : "Continue"}
          </Button>
        )}
      </form>
    </div>
  );
}

function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="group flex items-center gap-3 border-b border-border pb-2 transition-colors focus-within:border-primary">
      <span className="text-muted-foreground group-focus-within:text-primary">{icon}</span>
      {children}
    </div>
  );
}

function LicenseUpload({ file, onChange }: { file: File | null; onChange: (f: File | null) => void }) {
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-accent/30 px-4 py-10 text-center transition-colors hover:border-primary hover:bg-accent/60">
      {file ? (
        <>
          <FileCheck2 className="h-10 w-10 text-primary" />
          <div>
            <p className="font-medium text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024).toFixed(0)} KB · Tap to replace
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Upload className="h-7 w-7 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Upload Driver's License</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Front of card · JPG, PNG, or PDF (max 5MB)
            </p>
          </div>
        </>
      )}
      <input
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0] ?? null;
          if (f && f.size > 5 * 1024 * 1024) {
            return;
          }
          onChange(f);
        }}
      />
    </label>
  );
}
