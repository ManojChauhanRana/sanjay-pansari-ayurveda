import type { Metadata } from "next";
import { AuthCard } from "@/components/account/auth-card";

export const metadata: Metadata = {
  title: "Create Account | Krishna's Herbal & Ayurveda",
  description: "Create a customer account."
};

export default function RegisterPage() {
  return (
    <main className="bg-[#fbfaf4] px-5 py-12 md:py-16">
      <AuthCard mode="register" />
    </main>
  );
}
