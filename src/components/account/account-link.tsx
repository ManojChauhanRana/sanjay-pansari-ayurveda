"use client";

import { LoaderCircle, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";

export function AccountLink() {
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
      <div className="flex size-11 items-center justify-center text-[#5d6258]" aria-label="Loading account">
        <LoaderCircle size={20} className="animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <Link href="/account/login" className="focus-ring flex size-11 items-center justify-center" aria-label="Log in">
        <UserRound size={23} strokeWidth={2} />
      </Link>
    );
  }

  return (
    <div className="flex items-center">
      <Link href="/account" className="focus-ring flex size-11 items-center justify-center" aria-label="Your account">
        <UserRound size={23} strokeWidth={2} />
      </Link>
      <button type="button" onClick={handleSignOut} className="focus-ring hidden min-h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-[#305724] lg:flex" disabled={signingOut}>
        {signingOut ? <LoaderCircle size={16} className="animate-spin" /> : <LogOut size={16} />}
        Logout
      </button>
    </div>
  );
}
