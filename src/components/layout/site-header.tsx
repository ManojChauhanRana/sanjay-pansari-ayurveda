import { ChevronDown, Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AccountLink } from "@/components/account/account-link";
import { CartLink } from "@/components/cart/cart-link";
import { headerCategoryItems, headerProductItems, siteBrand, siteContact, siteSocials, type MegaMenuItem } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white text-[#242424]">
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
        <div className="mx-auto grid min-h-[72px] max-w-[1400px] grid-cols-[44px_1fr_auto] items-center gap-x-2 px-5 py-2 lg:min-h-[92px] lg:grid-cols-[1fr_4fr_1fr] lg:py-4">
          <div className="flex items-center lg:hidden">
            <button className="focus-ring flex size-9 items-center justify-center rounded-full bg-[#e1e3e1]" aria-label="Menu">
              <Menu size={20} />
            </button>
          </div>

          <Link href="/" className="mx-auto block w-[150px] lg:mx-0 lg:w-[210px]" aria-label={siteBrand.name}>
            <div className="flex items-center gap-3">
              <Image src={siteBrand.logo} alt={siteBrand.name} width={64} height={64} priority className="h-12 w-12 object-contain lg:h-14 lg:w-14" />
              <div className="text-left leading-none">
                <span className="block text-[16px] font-extrabold tracking-tight text-[#305724] lg:text-[20px]">{siteBrand.name.toUpperCase()}</span>
                <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.32em] text-[#6e725f] lg:text-[10px]">{siteBrand.subtitle}</span>
              </div>
            </div>
          </Link>

          <nav className="hidden items-center justify-center lg:flex">
            <ul className="flex flex-wrap items-center justify-center text-sm font-medium">
              <MegaMenu label="Category" href="/collections/all-products" items={headerCategoryItems} />
              <MegaMenu label="Products" href="/collections/all" items={headerProductItems} />
              <SimpleNav label="Combos" href="/collections/combos" />
              <SimpleNav label="Offers" href="/collections/offers" />
              <SimpleNav label="Consult by Vaidya" href="/pages/consult-by-vaidya" />
              <SimpleNav label="Rewards" href="/pages/rewards" />
              <SimpleNav label="Blog" href="https://blog.krishnaayurved.com/" />
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
          <Link href="/pages/rewards">Rewards</Link>
        </div>
      </div>
    </header>
  );
}

function SocialIcon({ label }: { label: string }) {
  if (label === "Twitter") return <span className="text-[11px] font-bold uppercase">X</span>;
  if (label === "Facebook") return <span className="text-[12px] font-bold">f</span>;
  if (label === "Instagram") return <span className="text-[10px] font-bold uppercase">ig</span>;
  return <span className="text-[10px] font-bold uppercase">yt</span>;
}

function SimpleNav({ label, href }: { label: string; href: string }) {
  return (
    <li className="px-4">
      <Link href={href} className="flex items-center py-1 transition hover:text-[#305724]">
        {label}
      </Link>
    </li>
  );
}

function MegaMenu({ label, href, items }: { label: string; href: string; items: MegaMenuItem[] }) {
  return (
    <li className="group px-4">
      <Link href={href} className="flex items-center gap-2 py-1 transition hover:text-[#305724]">
        <span>{label}</span>
        <ChevronDown size={15} strokeWidth={2} className="transition duration-300 group-hover:rotate-180" />
      </Link>
      <div className="invisible absolute left-0 top-full w-full overflow-hidden bg-white text-[#1d1d1d] opacity-0 shadow-md transition duration-150 group-hover:visible group-hover:opacity-100">
        <div className="mx-auto max-h-[80vh] max-w-[1400px] overflow-y-auto px-5 py-7">
          <ul className="flex flex-row flex-wrap gap-5 xl:gap-8">
            {items.map((item) => (
              <MegaMenuCard key={item.href} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

function MegaMenuCard({ item }: { item: MegaMenuItem }) {
  return (
    <li className="w-24 lg:w-48">
      <div>
        {item.image ? (
          <Link href={item.href} className="focus-ring relative mt-1 block aspect-square overflow-hidden rounded-[10px] bg-[#f3f6ef]" aria-label={item.label}>
            <Image src={item.image} alt={item.label} fill className="object-cover transition duration-300 hover:scale-105" sizes="(max-width: 1024px) 96px, 192px" />
          </Link>
        ) : null}
        <Link href={item.href} className="mt-2 inline-block text-sm font-medium leading-snug transition hover:text-[#305724]">
          {item.label}
        </Link>
      </div>
    </li>
  );
}
