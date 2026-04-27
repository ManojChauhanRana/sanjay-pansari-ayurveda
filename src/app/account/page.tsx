import type { Metadata } from "next";
import { AccountPanel } from "@/components/account/account-panel";

export const metadata: Metadata = {
  title: "My Account | Sanjay Pansari Assandh",
  description: "View your account details and session."
};

export default function AccountPage() {
  return (
    <main className="bg-[#fbfaf4] px-5 py-12 md:py-16">
      <AccountPanel />
    </main>
  );
}
