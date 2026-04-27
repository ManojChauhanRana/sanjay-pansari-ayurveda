import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteBrand, siteContact, siteDescription, siteSocials } from "@/lib/site-data";

export const metadata: Metadata = {
  title: `Contact Us | ${siteBrand.name}`,
  description: "Contact details, support information, and working hours."
};

const contactCards = [
  {
    label: "Our Hotline",
    value: siteContact.phone,
    sub: "Available during working hours",
    href: `tel:${siteContact.phone.replace(/\s+/g, "")}`,
    icon: Phone
  },
  {
    label: "WhatsApp",
    value: siteContact.whatsapp,
    sub: "Instant support",
    href: siteContact.whatsappUrl,
    icon: Phone
  },
  {
    label: "Email",
    value: siteContact.email,
    sub: "Product and support help",
    href: `mailto:${siteContact.email}`,
    icon: Mail
  },
  {
    label: "Our Location",
    value: siteContact.address,
    sub: siteContact.addressLine2,
    href: siteContact.mapUrl,
    icon: MapPin
  }
];

export default function ContactUsPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-[#e1e3e1] bg-[#fbfaf4]">
        <div className="mx-auto max-w-[1040px] px-5 py-12 text-center md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#305724]">Contact</p>
          <h1 className="mt-3 text-[34px] font-semibold leading-tight text-[#242424] md:text-[46px]">Get in touch</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5d6258]">{siteDescription}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-10 md:py-14">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {contactCards.map((card) => (
            <Link key={card.label} href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} className="rounded-[10px] border border-[#e1e3e1] bg-white p-5 transition hover:border-[#305724]">
              <div className="flex size-11 items-center justify-center rounded-full bg-[#eef5ea] text-[#305724]">
                <card.icon size={20} />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#6e725f]">{card.label}</p>
              <p className="mt-2 text-lg font-semibold text-[#242424]">{card.value}</p>
              <p className="mt-1 text-sm text-[#5d6258]">{card.sub}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[10px] border border-[#e1e3e1] bg-[#fbfaf4] p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-[#242424]">Support details</h2>
            <div className="mt-6 space-y-5 text-sm leading-7 text-[#4d5149]">
              <p><strong>Business:</strong> {siteContact.businessName}</p>
              <p>
                <strong>Address:</strong> {siteContact.address},{" "}
                <Link href={siteContact.mapUrl} target="_blank" className="text-[#305724] hover:text-[#1e432b]">
                  {siteContact.addressLine2}
                </Link>
              </p>
              <p><strong>Email:</strong> <a href={`mailto:${siteContact.email}`} className="text-[#305724] hover:text-[#1e432b]">{siteContact.email}</a></p>
              <p><strong>Working hours:</strong> {siteContact.hours}</p>
            </div>
          </div>

          <div className="rounded-[10px] border border-[#e1e3e1] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-[#242424]">Follow us</h2>
            <div className="mt-6 space-y-4">
              {siteSocials.map((social) => (
                <Link key={social.label} href={social.href} target="_blank" className="flex items-center justify-between rounded-md border border-[#e1e3e1] px-4 py-3 text-sm font-medium text-[#242424] transition hover:border-[#305724] hover:text-[#305724]">
                  <span className="flex items-center gap-3">
                    <ContactSocialIcon label={social.label} />
                    {social.label}
                  </span>
                  <span>Open</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactSocialIcon({ label }: { label: string }) {
  if (label === "Facebook") return <span className="text-[12px] font-bold">f</span>;
  if (label === "Instagram") return <span className="text-[10px] font-bold uppercase">ig</span>;
  return <span className="text-[11px] font-bold uppercase">in</span>;
}
