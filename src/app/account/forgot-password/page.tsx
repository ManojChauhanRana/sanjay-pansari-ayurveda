import type { Metadata } from "next";
import { ForgotPasswordCard } from "@/components/account/forgot-password-card";

export const metadata: Metadata = {
  title: "Forgot Password | Sanjay Pansari Assandh",
  description: "Request a password reset link."
};

export default function ForgotPasswordPage() {
  return (
    <main className="bg-[#fbfaf4] px-5 py-12 md:py-16">
      <ForgotPasswordCard />
    </main>
  );
}
