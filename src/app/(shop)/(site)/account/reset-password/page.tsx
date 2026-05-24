import type { Metadata } from "next";
import { ResetPasswordCard } from "@/components/account/reset-password-card";

export const metadata: Metadata = {
  title: "Reset Password | Sanjay Pansari Assandh",
  description: "Set a new password for your account."
};

export default function ResetPasswordPage() {
  return (
    <main className="bg-[#fbfaf4] px-5 py-12 md:py-16">
      <ResetPasswordCard />
    </main>
  );
}
