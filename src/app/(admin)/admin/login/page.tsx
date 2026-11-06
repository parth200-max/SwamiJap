"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@swamijap.com");
  const [password, setPassword] = useState("swamijap2026");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error || "Invalid credentials");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "An unexpected authentication error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-ivory p-4 sm:p-6">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-soft-pink/25"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full border border-mustard/40"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="space-y-6 rounded-lg border border-border bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-2 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm bg-brand-orange text-white">
              <span
                className="font-serif text-xl font-semibold leading-none"
                aria-hidden="true"
              >
                S
              </span>
            </span>
            <h1 className="font-serif text-h2 font-medium tracking-tight text-charcoal">
              Swami Jap Admin
            </h1>
            <p className="text-caption uppercase tracking-[0.14em] text-brown-strong">
              Store Management Console
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div
                role="alert"
                className="rounded-md border border-danger-border bg-danger-bg p-3 text-caption text-danger-text"
              >
                {error}
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="mt-2 w-full"
              isLoading={isLoading}
            >
              Sign In to Dashboard
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </form>

          <div className="space-y-2 border-t border-border pt-4 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-success-border bg-success-bg px-3 py-1 text-caption text-success-text">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Demo credentials pre-filled</span>
            </div>
            <p className="text-caption text-brown-strong">
              Email:{" "}
              <span className="font-medium text-charcoal">
                admin@swamijap.com
              </span>{" "}
              · Password:{" "}
              <span className="font-medium text-charcoal">swamijap2026</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
