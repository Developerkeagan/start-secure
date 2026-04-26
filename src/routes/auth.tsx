import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { SignupFlow } from "@/components/auth/SignupFlow";
import { OtpForm } from "@/components/auth/OtpForm";
import { Toaster } from "@/components/ui/sonner";

type View = "login" | "signup" | "forgot" | "otp";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in to VaultlyBank — Secure Banking" },
      {
        name: "description",
        content:
          "Access your VaultlyBank account or create a new one. Bank-grade security with multi-step verification.",
      },
      { property: "og:title", content: "Sign in to VaultlyBank" },
      {
        property: "og:description",
        content: "Bank-grade security with multi-step verification.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [view, setView] = useState<View>("login");
  const [otpEmail, setOtpEmail] = useState<string>("");
  const navigate = useNavigate();

  return (
    <>
      <AuthShell>
        {view === "login" && (
          <LoginForm
            onForgot={() => setView("forgot")}
            onSignup={() => setView("signup")}
          />
        )}
        {view === "forgot" && <ForgotPasswordForm onBack={() => setView("login")} />}
        {view === "signup" && (
          <SignupFlow
            onBackToLogin={() => setView("login")}
            onComplete={(email) => {
              setOtpEmail(email);
              setView("otp");
            }}
          />
        )}
        {view === "otp" && (
          <OtpForm
            contact={otpEmail || "your email"}
            onVerified={() => navigate({ to: "/dashboard" })}
          />
        )}
      </AuthShell>
      <Toaster position="top-center" />
    </>
  );
}
