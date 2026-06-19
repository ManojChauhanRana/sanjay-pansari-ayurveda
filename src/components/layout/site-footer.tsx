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
      { label: "Work with us", href: "/pages/work-with-us" }
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
              <h2 className="text-2xl font-bold">
                <span className="text-[#7fb4ff]">{siteBrand.firstName}</span>{" "}
                <span className="text-[#ff7676]">{siteBrand.lastName}</span>{" "}
                <span>{siteBrand.suffix}</span>
              </h2>
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
            <p className="text-sm font-semibold">Get health tips & offers</p>
            <p className="mt-1 text-xs text-[#cfd8c7]">Subscribe to our WhatsApp for Ayurvedic wellness tips.</p>
            <div className="mt-3">
              <Link
                href="https://wa.me/918708534358?text=Hi%2C%20I%20want%20to%20subscribe%20for%20health%20tips%20and%20offers."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-md bg-[#25d366] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1ebe5d]"
              >
                <svg viewBox="0 0 32 32" fill="white" className="size-4">
                  <path d="M16 0C7.164 0 0 7.163 0 16c0 2.824.737 5.477 2.027 7.785L0 32l8.468-2.001A15.942 15.942 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.27 19.455c-.398-.199-2.355-1.163-2.72-1.295-.366-.133-.632-.199-.898.199-.266.398-1.031 1.295-1.264 1.561-.232.265-.465.298-.863.1-.398-.199-1.681-.62-3.203-1.977-1.184-1.056-1.983-2.361-2.215-2.759-.232-.398-.025-.614.174-.812.179-.178.398-.465.597-.698.199-.232.265-.398.398-.664.133-.265.066-.498-.033-.697-.1-.199-.898-2.165-1.23-2.963-.324-.778-.654-.673-.898-.685l-.765-.013c-.266 0-.698.1-1.064.498s-1.397 1.362-1.397 3.322 1.43 3.853 1.629 4.119c.199.265 2.814 4.297 6.817 6.026.953.411 1.696.657 2.276.841.956.304 1.826.261 2.514.158.767-.114 2.355-.963 2.688-1.893.332-.93.332-1.727.232-1.893-.1-.166-.366-.266-.764-.465z"/>
                </svg>
                Join on WhatsApp
              </Link>
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
  return <span className="text-[11px] font-bold uppercase">yt</span>;
}
