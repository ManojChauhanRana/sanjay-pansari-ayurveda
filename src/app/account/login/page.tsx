import type { Metadata } from "next";
import { AuthCard } from "@/components/account/auth-card";

export const metadata: Metadata = {
  title: "Login | Krishna's Herbal & Ayurveda",
  description: "Access your customer account."
};

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
    notice?: string;
    email?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next, notice, email } = await searchParams;
  const decodedEmail = email ? decodeURIComponent(email) : "";
  const noticeMessage =
    notice === "confirm-email" && decodedEmail
      ? `Confirmation email sent to ${decodedEmail}. Please verify your email before logging in.`
      : undefined;

  return (
    <main className="bg-[#fbfaf4] px-5 py-12 md:py-16">
      <AuthCard mode="login" nextPath={next} notice={noticeMessage} noticeEmail={decodedEmail || undefined} />
    </main>
  );
}
