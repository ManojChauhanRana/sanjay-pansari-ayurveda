"use client";

import { AuthApiError } from "@supabase/supabase-js";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function AuthCard({
  mode,
  nextPath,
  notice,
  noticeEmail
}: {
  mode: "login" | "register";
  nextPath?: string;
  notice?: string;
  noticeEmail?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const isLogin = mode === "login";
  const router = useRouter();

  function updateField(name: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = getSupabaseBrowserClient();

      if (isLogin) {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password
        });

        if (loginError) throw loginError;

        router.push(nextPath || "/account");
        router.refresh();
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            first_name: form.firstName,
            last_name: form.lastName,
            full_name: `${form.firstName} ${form.lastName}`.trim(),
            phone: form.phone
          }
        }
      });

      if (signUpError) throw signUpError;

      const requiresEmailConfirmation = !data.session;
      const encodedEmail = encodeURIComponent(form.email);

      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: ""
      });

      if (requiresEmailConfirmation) {
        router.push(`/account/login?notice=confirm-email&email=${encodedEmail}`);
        router.refresh();
        return;
      }

      setSuccess("Account created successfully. You are now logged in.");
      router.push("/account");
      router.refresh();
    } catch (caughtError) {
      if (caughtError instanceof AuthApiError) {
        setError(caughtError.message);
      } else if (caughtError instanceof Error) {
        setError(caughtError.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResendConfirmation() {
    if (!noticeEmail) return;

    setResending(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: noticeEmail
      });

      if (resendError) throw resendError;

      setSuccess(`Confirmation email resent to ${noticeEmail}. Please check your inbox.`);
    } catch (caughtError) {
      if (caughtError instanceof AuthApiError) {
        setError(caughtError.message);
      } else if (caughtError instanceof Error) {
        setError(caughtError.message);
      } else {
        setError("Unable to resend confirmation email. Please try again.");
      }
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="mx-auto max-w-[460px] rounded-[10px] border border-[#e1e3e1] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-full bg-[#eef5ea] text-[#305724]">
          <Leaf size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#305724]">Account</p>
          <h1 className="text-2xl font-semibold text-[#242424]">{isLogin ? "Login" : "Create account"}</h1>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {notice ? (
          <div className="rounded-md bg-[#eef5ea] p-4 text-sm leading-6 text-[#305724]">
            <p>{notice}</p>
            {isLogin && noticeEmail ? (
              <button type="button" onClick={handleResendConfirmation} className="mt-3 text-sm font-semibold underline underline-offset-2" disabled={resending}>
                {resending ? "Resending..." : "Resend confirmation email"}
              </button>
            ) : null}
          </div>
        ) : null}
        {!isLogin ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name" type="text" value={form.firstName} onChange={(value) => updateField("firstName", value)} />
            <Field label="Last name" type="text" value={form.lastName} onChange={(value) => updateField("lastName", value)} />
          </div>
        ) : null}
        <Field label="Email" type="email" value={form.email} onChange={(value) => updateField("email", value)} />
        <div>
          <label className="mb-2 block text-sm font-medium text-[#242424]">Password</label>
          <div className="flex min-h-12 items-center rounded-md border border-[#d8ddd4] bg-white px-3">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              placeholder={isLogin ? "Enter password" : "Create password"}
              required
            />
            <button type="button" onClick={() => setShowPassword((value) => !value)} className="focus-ring flex size-9 items-center justify-center rounded-full text-[#5d6258]" aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        {!isLogin ? <Field label="Phone number" type="tel" value={form.phone} onChange={(value) => updateField("phone", value)} /> : null}

        <button type="submit" className="focus-ring min-h-12 w-full rounded-md bg-[#305724] px-6 text-sm font-semibold text-white transition hover:bg-[#1e432b]" disabled={submitting}>
          {submitting ? "Please wait..." : isLogin ? "Login" : "Create account"}
        </button>

        {error ? <p className="rounded-md bg-[#fff3f1] p-4 text-sm leading-6 text-[#b4432c]">{error}</p> : null}
        {success ? <p className="rounded-md bg-[#eef5ea] p-4 text-sm leading-6 text-[#305724]">{success}</p> : null}
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
        {isLogin ? (
          <>
            <Link href="/account/register" className="font-semibold text-[#305724] hover:text-[#1e432b]">
              Create account
            </Link>
            <Link href="/account/forgot-password" className="font-medium text-[#5d6258] hover:text-[#305724]">
              Forgot password?
            </Link>
          </>
        ) : (
          <Link href="/account/login" className="font-semibold text-[#305724] hover:text-[#1e432b]">
            Already have an account? Login
          </Link>
        )}
      </div>
    </div>
  );
}

function Field({ label, type, value, onChange }: { label: string; type: string; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#242424]">{label}</label>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="min-h-12 w-full rounded-md border border-[#d8ddd4] bg-white px-4 text-sm outline-none transition focus:border-[#305724]" required />
    </div>
  );
}
