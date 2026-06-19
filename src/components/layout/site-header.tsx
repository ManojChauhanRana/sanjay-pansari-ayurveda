import { Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AccountLink } from "@/components/account/account-link";
import { CartLink } from "@/components/cart/cart-link";
import { siteBrand, siteContact, siteSocials } from "@/lib/site-data";
import { DynamicCategoryMenu } from "./dynamic-category-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white text-[#242424]">
      {/* Top Bar omitted for brevity but included in original */}
      <div className="bg-[#305724] text-white">
        <div className="mx-auto flex min-h-11 max-w-[1400px] items-center justify-center px-5 text-center text-[11px] font-medium md:min-h-10 md:text-[12.6px] lg:justify-between">
          <div className="flex items-center gap-8 overflow-hidden">
            <p className="shrink-0">Beware of fake calls offering schemes and asking for money. We never request payments on call</p>
            <p className="hidden shrink-0 md:block">100% Ayurvedic & Herbal Products</p>
            <p className="hidden shrink-0 md:block">Call us: {siteContact.phone}</p>
          </div>
          <div className="hidden items-center opacity-80 lg:flex">
            {siteSocials.map((social) => (
              <Link key={social.label} href={social.href} target="_blank" className="flex size-11 items-center justify-center text-xs font-semibold uppercase transition hover:opacity-100" aria-label={social.label}>
                <SocialIcon label={social.label} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-b border-[#e1e3e1] bg-white">
        <div className="mx-auto grid min-h-[72px] max-w-[1400px] grid-cols-[44px_1fr_auto] items-center gap-x-2 px-5 py-2 lg:min-h-[92px] lg:grid-cols-[1fr_4fr_1fr] lg:py-0">
          <div className="flex items-center lg:hidden">
            <button className="focus-ring flex size-9 items-center justify-center rounded-full bg-[#e1e3e1]" aria-label="Menu">
              <Menu size={20} />
            </button>
          </div>

          <Link href="/" className="mx-auto block w-[150px] lg:mx-0 lg:w-[210px] py-4" aria-label={siteBrand.name}>
            <div className="flex items-center gap-3">
              <Image src={siteBrand.logo} alt={siteBrand.name} width={64} height={64} priority className="h-12 w-12 object-contain lg:h-14 lg:w-14" />
              <div className="text-left leading-none">
                <span className="block text-[16px] font-extrabold tracking-tight lg:text-[20px]">
                  <span className="text-[#123a7a]">{siteBrand.firstName.toUpperCase()}</span>{" "}
                  <span className="text-[#c51f27]">{siteBrand.lastName.toUpperCase()}</span>
                </span>
                <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.32em] text-[#6e725f] lg:text-[10px]">{siteBrand.subtitle}</span>
              </div>
            </div>
          </Link>

          <nav className="hidden items-center justify-center lg:flex self-stretch">
            <ul className="flex h-full flex-wrap items-center justify-center text-sm font-medium">
              <DynamicCategoryMenu />
              <SimpleNav label="Products" href="/collections/all" />
              <SimpleNav label="Combos" href="/collections/combos" />
              <SimpleNav label="Offers" href="/collections/offers" />
              <SimpleNav label="Consult by Vaidya" href="/pages/consult-by-vaidya" />
              <SimpleNav label="About Us" href="/pages/about-us" />
              <SimpleNav label="Rewards" href="/pages/rewards" />
            </ul>
          </nav>

          <div className="flex items-center justify-end">
            <Link href="/search" className="focus-ring flex size-11 items-center justify-center" aria-label="Search">
              <Search size={23} strokeWidth={2} />
            </Link>
            <AccountLink />
            <CartLink />
          </div>
        </div>
      </div>

      <div className="border-b border-[#e1e3e1] bg-white lg:hidden">
        <div className="flex gap-5 overflow-x-auto px-5 py-3 text-sm font-medium">
          <Link href="/collections/all-products">Category</Link>
          <Link href="/collections/all">Products</Link>
          <Link href="/collections/combos">Combos</Link>
          <Link href="/collections/offers">Offers</Link>
          <Link href="/pages/consult-by-vaidya">Consult by Vaidya</Link>
          <Link href="/pages/about-us">About Us</Link>
          <Link href="/pages/rewards">Rewards</Link>
        </div>
      </div>
    </header>
  );
}

function SocialIcon({ label }: { label: string }) {
  if (label === "Facebook") return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  );
  if (label === "Instagram") return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
  return <span className="text-[10px] font-bold uppercase">yt</span>;
}

function SimpleNav({ label, href }: { label: string; href: string }) {
  return (
    <li className="px-4 h-full flex items-center">
      <Link href={href} className="flex items-center py-4 transition hover:text-[#305724]">
        {label}
      </Link>
    </li>
  );
}
