import type { Metadata } from "next";
import Link from "next/link";
import { Gift, Star, Wallet } from "lucide-react";

export const metadata: Metadata = {
  title: "Rewards | Krishna's Herbal & Ayurveda",
  description: "Rewards program placeholder page."
};

const cards = [
  {
    title: "Earn points",
    description: "Reward rules can be connected later to account activity and order history.",
    icon: Star
  },
  {
    title: "Redeem offers",
    description: "Points and discount rules can be applied at checkout in the payment integration phase.",
    icon: Gift
  },
  {
    title: "Wallet history",
    description: "Customer reward balances can be synced after auth and backend setup are connected.",
    icon: Wallet
  }
];

export default function RewardsPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-[#e1e3e1] bg-[#fbfaf4]">
        <div className="mx-auto max-w-[1100px] px-5 py-12 text-center md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#305724]">Rewards</p>
          <h1 className="mt-3 text-[34px] font-semibold leading-tight text-[#242424] md:text-[46px]">Customer rewards</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5d6258]">The full rewards engine will depend on authentication, customer profiles, and order data. The frontend page is ready now so the navigation works cleanly.</p>
          <Link href="/account/register" className="focus-ring mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-[#305724] px-6 text-sm font-semibold text-white">
            Create account
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1100px] gap-5 px-5 py-10 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="rounded-[10px] border border-[#e1e3e1] bg-white p-5">
            <div className="flex size-11 items-center justify-center rounded-full bg-[#eef5ea] text-[#305724]">
              <card.icon size={20} />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-[#242424]">{card.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#5d6258]">{card.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
