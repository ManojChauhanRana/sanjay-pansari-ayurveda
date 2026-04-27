import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteBrand, siteContact, siteDescription, siteSocials } from "@/lib/site-data";

const footerGroups = [
  {
    title: "About Us",
    links: [
      { label: "About Us", href: "/pages/about-us" },
      { label: "Contact Us", href: "/pages/contact-us" },
      { label: "Media", href: "/pages/media" },
      { label: "Work with us", href: "/pages/work-with-us" },
      { label: "Blog", href: "https://blog.krishnaayurved.com/" }
    ]
  },
  {
    title: "Your Account",
    links: [
      { label: "Login", href: "/account/login" },
      { label: "Create Account", href: "/account/register" },
      { label: "Rewards", href: "/pages/rewards" },
      { label: "Track Order", href: "/pages/track-order" }
    ]
  },
  {
    title: "Policies",
    links: [
      { label: "Terms & Conditions", href: "/pages/terms-conditions" },
      { label: "Privacy Policy", href: "/pages/privacy-policy" },
      { label: "Shipping Policy", href: "/pages/shipping-policy" },
      { label: "Return Policy", href: "/pages/return-policy" },
      { label: "Disclaimer", href: "/pages/disclaimer" }
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e1d8c5] bg-[#243c2a] text-white">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.2fr_2fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src={siteBrand.logo} alt={siteBrand.name} width={56} height={56} className="h-14 w-14 object-contain" />
            <div>
              <h2 className="text-2xl font-bold">{siteBrand.name}</h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#e8eadc]">{siteBrand.subtitle}</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#e8eadc]">
            {siteDescription}
          </p>
          <div className="mt-6 space-y-3 text-sm text-[#e8eadc]">
            <div className="flex items-start gap-3">
              <Phone size={16} className="mt-0.5 shrink-0" />
              <div>
                <p>{siteContact.phone}</p>
                <p className="text-[#cfd8c7]">{siteContact.whatsapp}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={16} className="mt-0.5 shrink-0" />
              <a href={`mailto:${siteContact.email}`} className="hover:text-white">
                {siteContact.email}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <div>
                <p>{siteContact.address}</p>
                <Link href={siteContact.mapUrl} target="_blank" className="text-[#cfd8c7] hover:text-white">
                  {siteContact.addressLine2}
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-md border border-white/15 bg-white/10 p-4">
            <p className="text-sm font-semibold">Subscribe to our emails</p>
            <div className="mt-3 flex gap-2">
              <input className="min-w-0 flex-1 rounded-md border border-white/20 bg-white px-3 py-2 text-sm text-[#182117]" placeholder="Email" />
              <button className="rounded-md bg-[#d99a2b] px-4 py-2 text-sm font-bold text-white">Subscribe</button>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2">
            {siteSocials.map((social) => (
              <Link key={social.label} href={social.href} target="_blank" className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white hover:text-[#243c2a]" aria-label={social.label}>
                <FooterSocialIcon label={social.label} />
              </Link>
            ))}
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-bold">{group.title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-[#e8eadc]">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container text-sm text-[#e8eadc]">© 2026 {siteBrand.name}. All rights reserved.</div>
      </div>
    </footer>
  );
}

function FooterSocialIcon({ label }: { label: string }) {
  if (label === "Facebook") return <span className="text-[12px] font-bold">f</span>;
  if (label === "Instagram") return <span className="text-[10px] font-bold uppercase">ig</span>;
  return <span className="text-[11px] font-bold uppercase">in</span>;
}
