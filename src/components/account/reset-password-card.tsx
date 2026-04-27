"use client";

import { AuthApiError } from "@supabase/supabase-js";
import { Eye, EyeOff, KeyRound, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function ResetPasswordCard() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) throw updateError;

      setSuccess("Password updated successfully. Redirecting to your account...");
      window.setTimeout(() => {
        router.push("/account");
        router.refresh();
      }, 1200);
    } catch (caughtError) {
      if (caughtError instanceof AuthApiError) {
        setError(caughtError.message);
      } else if (caughtError instanceof Error) {
        setError(caughtError.message);
      } else {
        setError("Unable to reset password. Please try again from the email link.");
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
          <h1 className="text-2xl font-semibold text-[#242424]">Reset password</h1>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <PasswordField
          label="New password"
          value={password}
          onChange={setPassword}
          showPassword={showPassword}
          onToggle={() => setShowPassword((value) => !value)}
        />
        <PasswordField
          label="Confirm password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          showPassword={showPassword}
          onToggle={() => setShowPassword((value) => !value)}
        />

        <button type="submit" className="focus-ring inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#305724] px-6 text-sm font-semibold text-white" disabled={submitting}>
          {submitting ? <LoaderCircle size={16} className="animate-spin" /> : null}
          {submitting ? "Updating..." : "Update password"}
        </button>

        {error ? <p className="rounded-md bg-[#fff3f1] p-4 text-sm leading-6 text-[#b4432c]">{error}</p> : null}
        {success ? <p className="rounded-md bg-[#eef5ea] p-4 text-sm leading-6 text-[#305724]">{success}</p> : null}
      </form>
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  showPassword,
  onToggle
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#242424]">{label}</label>
      <div className="flex min-h-12 items-center rounded-md border border-[#d8ddd4] bg-white px-3">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          required
        />
        <button type="button" onClick={onToggle} className="focus-ring flex size-9 items-center justify-center rounded-full text-[#5d6258]" aria-label={showPassword ? "Hide password" : "Show password"}>
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
