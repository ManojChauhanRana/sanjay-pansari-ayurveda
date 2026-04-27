import type { Metadata } from "next";
import { notFound } from "next/navigation";

const pageContent: Record<string, { title: string; intro: string; sections: { title: string; body: string }[] }> = {
  "about-us": {
    title: "About Us",
    intro: "This page is ready for your final brand story and business details.",
    sections: [
      { title: "Brand story", body: "Add your founder story, manufacturing background, certifications, and ayurvedic philosophy here." },
      { title: "What we do", body: "This section can describe herbal products, consultation support, sourcing standards, and customer promise." }
    ]
  },
  "contact-us": {
    title: "Contact Us",
    intro: "Contact details and inquiry workflows can be added once you share the preferred phone, email, WhatsApp, and address information.",
    sections: [
      { title: "Customer support", body: "Use this area for support hours, consultation help, and shipping/order assistance." },
      { title: "Business inquiries", body: "Add distributor, partnership, media, or wholesale contact instructions here." }
    ]
  },
  media: {
    title: "Media",
    intro: "Media page placeholder for press mentions, brand assets, and interviews.",
    sections: [
      { title: "Press kit", body: "Company logo pack, bio, approved copy, and product visuals can live here." },
      { title: "Coverage", body: "Add articles, interviews, and verified mentions once available." }
    ]
  },
  "work-with-us": {
    title: "Work with us",
    intro: "Career page placeholder for roles, hiring process, and culture notes.",
    sections: [
      { title: "Open roles", body: "You can list current openings or link to your hiring workflow here." },
      { title: "Why join", body: "Add team culture, mission, and growth details for applicants." }
    ]
  },
  "track-order": {
    title: "Track Order",
    intro: "Order tracking will be connected after backend, auth, and order management are set up.",
    sections: [
      { title: "Order lookup", body: "This page can later accept order number, phone, or email to show tracking details." },
      { title: "Shipping status", body: "Courier integration and delivery events can be connected in the next commerce phase." }
    ]
  },
  "terms-conditions": {
    title: "Terms & Conditions",
    intro: "Legal copy placeholder.",
    sections: [
      { title: "Usage terms", body: "Replace this with your approved legal terms before launch." },
      { title: "Purchases", body: "Add commerce, pricing, shipping, and user-account clauses here." }
    ]
  },
  "privacy-policy": {
    title: "Privacy Policy",
    intro: "Privacy policy placeholder.",
    sections: [
      { title: "Data collection", body: "Explain what customer data is collected and why." },
      { title: "Security and sharing", body: "Clarify storage, security, analytics, and third-party service usage." }
    ]
  },
  "shipping-policy": {
    title: "Shipping Policy",
    intro: "Shipping policy placeholder.",
    sections: [
      { title: "Delivery timelines", body: "Add dispatch times, courier coverage, and exceptions." },
      { title: "Charges", body: "Add free-shipping thresholds and paid-shipping conditions here." }
    ]
  },
  "return-policy": {
    title: "Return Policy",
    intro: "Return policy placeholder.",
    sections: [
      { title: "Eligible returns", body: "Clarify return conditions, product categories, and refund windows." },
      { title: "Refund process", body: "Describe the approval and refund process customers should expect." }
    ]
  },
  disclaimer: {
    title: "Disclaimer",
    intro: "Healthcare and product disclaimer placeholder.",
    sections: [
      { title: "General guidance", body: "Ayurvedic wellness content should not replace individual medical advice." },
      { title: "Product use", body: "Add the approved advisory text you want shown before launch." }
    ]
  }
};

type InfoPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return Object.keys(pageContent).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: InfoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = pageContent[slug];

  return {
    title: page ? `${page.title} | Krishna's Herbal & Ayurveda` : "Page not found"
  };
}

export default async function InfoPage({ params }: InfoPageProps) {
  const { slug } = await params;
  const page = pageContent[slug];

  if (!page) notFound();

  return (
    <main className="bg-white">
      <section className="border-b border-[#e1e3e1] bg-[#fbfaf4]">
        <div className="mx-auto max-w-[960px] px-5 py-12 text-center md:py-16">
          <h1 className="text-[34px] font-semibold leading-tight text-[#242424] md:text-[46px]">{page.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5d6258]">{page.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[960px] px-5 py-10 md:py-14">
        <div className="space-y-8">
          {page.sections.map((section) => (
            <article key={section.title} className="rounded-[10px] border border-[#e1e3e1] bg-white p-6">
              <h2 className="text-xl font-semibold text-[#242424]">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#5d6258]">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
