"use client";

import { LoaderCircle, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";

export function AccountPanel() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut();
    setSigningOut(false);
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="mx-auto flex max-w-[540px] items-center justify-center rounded-[10px] border border-[#e1e3e1] bg-white p-8 shadow-sm">
        <LoaderCircle size={22} className="animate-spin text-[#305724]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-[540px] rounded-[10px] border border-[#e1e3e1] bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-[#242424]">Account</h1>
        <p className="mt-3 text-sm leading-6 text-[#5d6258]">You are not logged in yet. Please sign in to access your account.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/account/login" className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md bg-[#305724] px-5 text-sm font-semibold text-white">
            Login
          </Link>
          <Link href="/account/register" className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md border border-[#305724] px-5 text-sm font-semibold text-[#305724]">
            Create account
          </Link>
        </div>
      </div>
    );
  }

  const fullName =
    [user.user_metadata?.first_name, user.user_metadata?.last_name].filter(Boolean).join(" ").trim() ||
    user.user_metadata?.full_name ||
    "Customer";

  return (
    <div className="mx-auto max-w-[540px] rounded-[10px] border border-[#e1e3e1] bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-full bg-[#eef5ea] text-[#305724]">
          <UserRound size={22} />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#305724]">Welcome</p>
          <h1 className="text-2xl font-semibold text-[#242424]">{fullName}</h1>
        </div>
      </div>

      <div className="mt-6 rounded-md bg-[#fbfaf4] p-5 text-sm leading-7 text-[#4d5149]">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {user.user_metadata?.phone ? (
          <p>
            <strong>Phone:</strong> {user.user_metadata.phone}
          </p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={handleSignOut} className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#305724] px-5 text-sm font-semibold text-white" disabled={signingOut}>
          {signingOut ? <LoaderCircle size={16} className="animate-spin" /> : <LogOut size={16} />}
          Logout
        </button>
        <Link href="/collections/all" className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md border border-[#305724] px-5 text-sm font-semibold text-[#305724]">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
