"use client";

import { AuthApiError } from "@supabase/supabase-js";
import { KeyRound, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function ForgotPasswordCard() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const redirectTo = `${window.location.origin}/account/reset-password`;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

      if (resetError) throw resetError;

      setSuccess("Password reset link sent. Please check your email inbox.");
      setEmail("");
    } catch (caughtError) {
      if (caughtError instanceof AuthApiError) {
        setError(caughtError.message);
      } else if (caughtError instanceof Error) {
        setError(caughtError.message);
      } else {
        setError("Unable to send reset email. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-[460px] rounded-[10px] border border-[#e1e3e1] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-full bg-[#eef5ea] text-[#305724]">
          <KeyRound size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#305724]">Account Recovery</p>
          <h1 className="text-2xl font-semibold text-[#242424]">Forgot password</h1>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-[#242424]">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="min-h-12 w-full rounded-md border border-[#d8ddd4] bg-white px-4 text-sm outline-none transition focus:border-[#305724]"
            placeholder="Enter your email"
            required
          />
        </div>

        <button type="submit" className="focus-ring inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#305724] px-6 text-sm font-semibold text-white" disabled={submitting}>
          {submitting ? <LoaderCircle size={16} className="animate-spin" /> : null}
          {submitting ? "Sending..." : "Send reset link"}
        </button>

        {error ? <p className="rounded-md bg-[#fff3f1] p-4 text-sm leading-6 text-[#b4432c]">{error}</p> : null}
        {success ? <p className="rounded-md bg-[#eef5ea] p-4 text-sm leading-6 text-[#305724]">{success}</p> : null}
      </form>

      <div className="mt-6 text-sm">
        <Link href="/account/login" className="font-semibold text-[#305724] hover:text-[#1e432b]">
          Back to login
        </Link>
      </div>
    </div>
  );
}
