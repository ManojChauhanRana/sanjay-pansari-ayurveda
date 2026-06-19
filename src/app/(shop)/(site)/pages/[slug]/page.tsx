import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Award, CheckCircle2, FlaskConical, Leaf, MapPin, Phone, ShieldCheck, Star, Users } from "lucide-react";

// ─── ABOUT US ─────────────────────────────────────────────────────────────────

function AboutUsPage() {
  const milestones = [
    { year: "1999", event: "Sanjay Pansari Ayurvedic Clinic established in Assandh, Karnal" },
    { year: "2005", event: "Expanded to a full Multispeciality Ayurvedic Hospital with OPD services" },
    { year: "2012", event: "Launched proprietary herbal product line — Jigar Amrit, Majun, Achook" },
    { year: "2018", event: "Crossed 10,000 patients treated milestone" },
    { year: "2022", event: "Received GMP & ISO certification for herbal manufacturing" },
    { year: "2024", event: "Launched online store — serving patients across India" },
  ];

  const values = [
    { icon: Leaf, title: "100% Natural", desc: "Every formulation uses only pure, naturally sourced herbs — no chemicals, no steroids, no shortcuts." },
    { icon: FlaskConical, title: "Expert Formulation", desc: "Products are developed and tested by Dr. Sanjay Pansari with 25+ years of Ayurvedic expertise." },
    { icon: Users, title: "Patient First", desc: "Personalised consultation ensures every patient gets the right treatment for their unique condition." },
    { icon: ShieldCheck, title: "Certified Quality", desc: "Our manufacturing processes are GMP and ISO certified for safety, purity, and consistency." },
  ];

  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="border-b border-[#e1e3e1] bg-gradient-to-br from-[#1e3d24] to-[#305724] py-16 text-white md:py-20">
        <div className="container text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#a8c89e]">Our Story</p>
          <h1 className="mt-3 text-4xl font-black leading-tight md:text-5xl">Healing Haryana Since 1999</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/80">
            Sanjay Pansari Multispeciality Ayurvedic Hospital has been a beacon of natural healing for over 25 years. Founded by Dr. Sanjay Pansari, we combine ancient Ayurvedic wisdom with modern standards to deliver real, lasting results.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { v: "25+", l: "Years Experience" },
              { v: "15,000+", l: "Patients Treated" },
              { v: "20+", l: "Herbal Products" },
              { v: "100%", l: "Natural Ingredients" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-white/15 px-6 py-4 text-center">
                <p className="text-2xl font-black">{s.v}</p>
                <p className="text-xs text-white/70">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Section */}
      <section className="py-14 md:py-20">
        <div className="container">
          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* Real photo of Dr. Pansari with person */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/client/clinical_setup.jpg"
                alt="Dr. Sanjay Pansari"
                fill className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-lg font-black text-white">Dr. Sanjay Pansari</p>
                <p className="text-sm text-white/80">Founder, Sanjay Pansari Multispeciality Ayurvedic Hospital</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#305724]">Meet the Founder</p>
              <h2 className="mt-2 text-3xl font-black text-[#1d1d1d] md:text-4xl">Dr. Sanjay Pansari</h2>
              <p className="mt-1 text-base font-semibold text-[#305724]">BAMS, Ayurvedic Physician & Founder</p>
              <p className="mt-5 text-sm leading-8 text-[#4d5149]">
                Dr. Sanjay Pansari completed his Bachelor of Ayurvedic Medicine and Surgery (BAMS) and has since dedicated his life to bringing the healing power of Ayurveda to the people of Haryana and beyond. He founded Sanjay Pansari Multispeciality Ayurvedic Hospital in Assandh, Dist. Karnal, in 1999.
              </p>
              <p className="mt-4 text-sm leading-8 text-[#4d5149]">
                His approach is deeply personalised — he believes no two patients are the same, and every treatment plan must be tailored to the individual's body type, lifestyle, and condition. His proprietary formulations — including Jigar Amrit, Achook, Majun, and Full Count Capsule — have helped thousands of patients where conventional medicine offered no hope.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { icon: Award, text: "BAMS Qualified Physician" },
                  { icon: Users, text: "15,000+ Patients Treated" },
                  { icon: FlaskConical, text: "Proprietary Herbal Formulas" },
                  { icon: ShieldCheck, text: "GMP & ISO Certified" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 rounded-lg border border-[#e1e3e1] px-4 py-3 text-sm font-semibold text-[#263622]">
                    <Icon size={16} className="shrink-0 text-[#305724]" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Gallery — real photos */}
      <section className="bg-[#fbfaf4] py-12 md:py-14">
        <div className="container">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#305724]">Inside Our Hospital</p>
            <h2 className="mt-2 text-3xl font-black text-[#1d1d1d]">A Modern Ayurvedic Facility</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#5d6258]">
              State-of-the-art infrastructure with a warm, welcoming environment — designed for your comfort and healing.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
              <Image src="/images/client/hospital-waiting-room.png" alt="Hospital waiting area" fill className="object-cover transition duration-500 hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-sm font-bold text-white">Waiting Area</p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
              <Image src="/images/client/hospital-lobby.png" alt="Hospital lobby" fill className="object-cover transition duration-500 hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-sm font-bold text-white">Hospital Lobby</p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
              <Image src="/images/client/hospital-consultation-room.png" alt="Doctor's consultation room" fill className="object-cover transition duration-500 hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-sm font-bold text-white">Consultation Room</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-[#f3f6ef] py-12 md:py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#305724]">What We Stand For</p>
            <h2 className="mt-2 text-3xl font-black text-[#1d1d1d]">Our Core Values</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-[#dce5d1] bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#eef5ea]">
                  <Icon size={26} className="text-[#305724]" />
                </div>
                <h3 className="mt-4 text-base font-black text-[#1d1d1d]">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#5d6258]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#305724]">Our Journey</p>
            <h2 className="mt-2 text-3xl font-black text-[#1d1d1d]">25 Years of Milestones</h2>
          </div>
          <div className="relative mx-auto max-w-2xl">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-[#d1e1cd] md:left-1/2" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="relative flex w-8 shrink-0 flex-col items-center md:w-1/2 md:items-end md:pr-8">
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#305724] text-xs font-black text-white md:absolute md:right-[-16px]">
                      <Star size={14} />
                    </div>
                  </div>
                  <div className={`flex-1 rounded-xl border border-[#e1e3e1] bg-white p-5 shadow-sm md:w-1/2 md:flex-none ${i % 2 === 0 ? "md:ml-8" : "md:mr-8"}`}>
                    <p className="text-xs font-black uppercase tracking-wider text-[#305724]">{m.year}</p>
                    <p className="mt-1 text-sm leading-6 text-[#4d5149]">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hospital / Certifications — with real reception photo */}
      <section className="relative overflow-hidden py-12 text-white md:py-16">
        <Image
          src="/images/client/hospital-reception.png"
          alt="Sanjay Pansari Hospital Reception"
          fill className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1a2e1f]/85" />
        <div className="container relative z-10">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#a8c89e]">Our Hospital</p>
              <h2 className="mt-2 text-3xl font-black">Sanjay Pansari Multispeciality Ayurvedic Hospital</h2>
              <p className="mt-4 text-sm leading-8 text-white/80">
                Located in Assandh, Dist. Karnal, Haryana, our hospital offers in-person OPD consultation, Panchakarma therapy, and online consultation for patients across India. Our products are available online and dispatched pan-India.
              </p>
              <div className="mt-6 space-y-3 text-sm text-white/80">
                <div className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-[#d99a2b]" /><span>Karnal Road, Assandh, Dist. Karnal, Haryana</span></div>
                <div className="flex items-start gap-3"><Phone size={16} className="mt-0.5 shrink-0 text-[#d99a2b]" /><span>+91 83970 80000 / +91 87085 34358</span></div>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#a8c89e]">Certifications</p>
              <h2 className="mt-2 text-3xl font-black">Quality You Can Trust</h2>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {["ISO Certified", "GMP Certified", "100% Herbal", "No Side Effects", "Lab Tested", "BAMS Qualified"].map((cert) => (
                  <div key={cert} className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold">
                    <CheckCircle2 size={16} className="shrink-0 text-[#7fc97f]" />
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#fbfaf4] py-12 text-center">
        <div className="container">
          <h2 className="text-2xl font-black text-[#1d1d1d] md:text-3xl">Start Your Healing Journey Today</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#5d6258]">
            Consult with Dr. Sanjay Pansari and get a personalised Ayurvedic treatment plan tailored to your body and condition.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link href="/pages/consult-by-vaidya" className="rounded-full bg-[#305724] px-8 py-3.5 text-sm font-bold text-white transition hover:bg-[#1e432b]">
              Book Consultation
            </Link>
            <Link href="/collections/all" className="rounded-full border-2 border-[#305724] px-8 py-3.5 text-sm font-bold text-[#305724] transition hover:bg-[#305724] hover:text-white">
              Shop Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── GENERIC POLICY PAGE ──────────────────────────────────────────────────────

const pageContent: Record<string, { title: string; intro: string; sections: { title: string; body: string }[] }> = {
  media: {
    title: "Media",
    intro: "Press kit, brand assets, and media coverage for Sanjay Pansari Multispeciality Ayurvedic Hospital.",
    sections: [
      { title: "About the Brand", body: "Sanjay Pansari Multispeciality Ayurvedic Hospital is one of Haryana's most trusted Ayurvedic institutions, founded in 1999 by Dr. Sanjay Pansari (BAMS). With over 25 years of experience and 15,000+ patients treated, the hospital is known for its proprietary herbal formulations and personalised care." },
      { title: "Press Enquiries", body: "For interviews, features, or press coverage, contact us at sanjaypansariassandh@gmail.com or call +91 83970 80000." },
      { title: "Brand Assets", body: "Official logos, product images, and approved copy are available on request for verified media partners. Please contact our team." },
    ]
  },
  "work-with-us": {
    title: "Work With Us",
    intro: "Join the Sanjay Pansari family and be part of a mission to bring authentic Ayurvedic healing to every Indian home.",
    sections: [
      { title: "Why Join Us", body: "We are a growing Ayurvedic brand with a deep commitment to natural healing. Our team is small, passionate, and purpose-driven. We look for people who share our values of quality, honesty, and patient-first thinking." },
      { title: "Current Openings", body: "We are currently looking for: Customer Support Executive, Digital Marketing Associate, Ayurvedic Consultant (BAMS preferred), Delivery & Logistics Coordinator. To apply, email your resume to sanjaypansariassandh@gmail.com with the role in the subject line." },
      { title: "Distributor / Stockist Enquiries", body: "Interested in distributing our products in your region? We welcome stockist and distributor enquiries across Haryana, Punjab, Delhi-NCR, and beyond. Call us at +91 83970 80000." },
    ]
  },
  "track-order": {
    title: "Track Your Order",
    intro: "Use your order ID or registered phone number to track your delivery status.",
    sections: [
      { title: "How to Track", body: "After your order is confirmed and dispatched, you will receive a tracking link via WhatsApp or SMS on your registered number. You can use that link to check your shipment status in real time." },
      { title: "Delivery Timeline", body: "Orders are usually dispatched within 1–2 business days. Delivery takes 3–7 business days depending on your location within India. Express delivery options may be available — contact us for details." },
      { title: "Need Help?", body: "If you have not received your tracking details or have questions about your order, contact us at +91 83970 80000 or WhatsApp +91 87085 34358. Our team responds within a few hours during business hours (9 AM – 7 PM)." },
    ]
  },
  "terms-conditions": {
    title: "Terms & Conditions",
    intro: "Please read these terms carefully before using our website or purchasing our products.",
    sections: [
      { title: "1. Acceptance of Terms", body: "By accessing or using this website (sanjaypansariassandh.com), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the site." },
      { title: "2. Products & Pricing", body: "All products listed are subject to availability. Prices are displayed in Indian Rupees (INR) and include applicable taxes. We reserve the right to update pricing at any time without prior notice. Orders placed before a price change will be honoured at the price shown at checkout." },
      { title: "3. Orders & Payments", body: "Orders are confirmed upon successful payment. We accept major payment methods including UPI, net banking, debit/credit cards, and cash on delivery (where available). All transactions are secured via SSL encryption." },
      { title: "4. Ayurvedic Disclaimer", body: "Our products are Ayurvedic formulations meant to support wellness. They are not a substitute for professional medical advice, diagnosis, or treatment. Please consult a qualified physician before starting any new health regimen, especially if you are pregnant, nursing, or under medical supervision." },
      { title: "5. Intellectual Property", body: "All content on this website — including text, images, logos, and product descriptions — is the intellectual property of Sanjay Pansari Assandh. Reproduction without written permission is prohibited." },
      { title: "6. Governing Law", body: "These terms are governed by the laws of India. Any disputes are subject to the jurisdiction of courts in Karnal, Haryana." },
    ]
  },
  "privacy-policy": {
    title: "Privacy Policy",
    intro: "We value your privacy. This policy explains what data we collect, how we use it, and how we protect it.",
    sections: [
      { title: "1. Information We Collect", body: "We collect information you provide directly: name, phone number, email address, shipping address, and health concerns (when booking consultations). We also collect browsing data (pages visited, time spent) via analytics tools to improve the website." },
      { title: "2. How We Use Your Information", body: "Your information is used to: process and deliver orders, send order updates and tracking details, provide personalised Ayurvedic consultation, send health tips and offers (if you opt in), and improve our products and services." },
      { title: "3. Data Sharing", body: "We do not sell your personal data to third parties. Data may be shared with: delivery partners (name and address for shipping), payment gateways (for transaction processing), and analytics tools (in anonymised form). All third parties are contractually bound to protect your data." },
      { title: "4. Data Security", body: "We use SSL encryption, secure servers, and industry-standard practices to protect your data. However, no method of transmission over the internet is 100% secure — we cannot guarantee absolute security." },
      { title: "5. Cookies", body: "Our website uses cookies to improve your experience, remember preferences, and track site performance. You can disable cookies in your browser settings, but some features may not function properly." },
      { title: "6. Your Rights", body: "You have the right to access, correct, or delete your personal data. To make a request, contact us at sanjaypansariassandh@gmail.com. We will respond within 30 days." },
    ]
  },
  "shipping-policy": {
    title: "Shipping Policy",
    intro: "We aim to deliver your Ayurvedic medicines safely and promptly across India.",
    sections: [
      { title: "Order Processing", body: "Orders are processed within 1–2 business days of payment confirmation. You will receive a WhatsApp/SMS notification once your order is dispatched." },
      { title: "Delivery Timeline", body: "Standard delivery takes 3–7 business days depending on your location. Metro cities (Delhi, Mumbai, Bangalore, etc.) typically receive orders in 3–4 days. Remote or rural areas may take up to 7–10 days." },
      { title: "Shipping Charges", body: "Free shipping on orders above ₹1,000. Orders below ₹1,000 attract a flat shipping charge of ₹80. Express delivery is available in select pin codes for an additional charge — contact us for details." },
      { title: "Packaging", body: "All products are securely packed to prevent damage in transit. Liquid products (juices, sharbats) are additionally bubble-wrapped and sealed." },
      { title: "Order Tracking", body: "A tracking link will be shared on your registered WhatsApp/phone number once the order is shipped. You can also call us at +91 83970 80000 to get a status update." },
      { title: "Delivery Issues", body: "If your order is delayed beyond the estimated timeline, damaged in transit, or incorrectly delivered, please contact us immediately at +91 83970 80000 or WhatsApp +91 87085 34358." },
    ]
  },
  "return-policy": {
    title: "Return & Refund Policy",
    intro: "We stand behind the quality of our products. Here is our straightforward return and refund policy.",
    sections: [
      { title: "Return Eligibility", body: "Returns are accepted within 7 days of delivery for: damaged or defective products, wrong item delivered, or products with a manufacturing defect. Products must be unused, in original packaging, with the seal intact." },
      { title: "Non-Returnable Items", body: "Opened or used products cannot be returned due to health and hygiene reasons. Products damaged due to improper storage or misuse are not eligible for return. Customised or consultation-specific products are non-returnable." },
      { title: "How to Initiate a Return", body: "Contact us within 7 days of delivery via WhatsApp (+91 87085 34358) or call +91 83970 80000. Share your order ID, the issue, and photos of the product/packaging. Our team will guide you through the return process." },
      { title: "Refund Process", body: "Once your return is received and verified, a refund will be issued within 5–7 business days. Refunds are processed to the original payment method. COD orders will receive a bank transfer — please share your account details." },
      { title: "Exchange", body: "We offer exchanges for damaged or wrong products. If the exact product is unavailable, you may choose an alternative of equal value or opt for a full refund." },
    ]
  },
  disclaimer: {
    title: "Disclaimer",
    intro: "Important health and legal information about our products and services.",
    sections: [
      { title: "Health Disclaimer", body: "The products and information provided on this website are for general wellness support and educational purposes only. They are NOT intended to diagnose, treat, cure, or prevent any medical condition. Always consult a qualified medical professional before starting any new supplement or treatment, especially if you have a pre-existing condition, are pregnant, nursing, or on medication." },
      { title: "Results Disclaimer", body: "Individual results may vary. The testimonials and case studies shared on this website reflect the personal experiences of specific patients and are not a guarantee of similar results. Ayurvedic treatment outcomes depend on individual body type, diet, lifestyle, and adherence to the prescribed regimen." },
      { title: "Product Information", body: "All products are classified as Ayurvedic formulations and comply with applicable AYUSH regulations. They are manufactured in GMP-certified facilities. However, they are not evaluated or approved by FSSAI, FDA, or similar bodies as medicines." },
      { title: "Website Content", body: "We make every effort to ensure the accuracy of content on this website. However, we do not warrant the completeness or accuracy of any information. Content is subject to change without notice." },
    ]
  },
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

type InfoPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ["about-us", ...Object.keys(pageContent)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: InfoPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "about-us") return { title: "About Us | Sanjay Pansari Assandh" };
  const page = pageContent[slug];
  return { title: page ? `${page.title} | Sanjay Pansari Assandh` : "Page not found" };
}

export default async function InfoPage({ params }: InfoPageProps) {
  const { slug } = await params;

  if (slug === "about-us") return <AboutUsPage />;

  const page = pageContent[slug];
  if (!page) notFound();

  return (
    <main className="bg-white">
      <section className="border-b border-[#e1e3e1] bg-[#fbfaf4]">
        <div className="mx-auto max-w-[960px] px-5 py-12 text-center md:py-16">
          <h1 className="text-[34px] font-bold leading-tight text-[#242424] md:text-[46px]">{page.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5d6258]">{page.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[960px] px-5 py-10 md:py-14">
        <div className="space-y-6">
          {page.sections.map((section) => (
            <article key={section.title} className="rounded-[10px] border border-[#e1e3e1] bg-white p-6 md:p-8">
              <h2 className="text-lg font-bold text-[#242424]">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#5d6258]">{section.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-xl bg-[#eef5ea] p-6 text-center">
          <p className="text-sm font-semibold text-[#305724]">Have a question? We're happy to help.</p>
          <p className="mt-2 text-sm text-[#4d5149]">Call us at <strong>+91 83970 80000</strong> or WhatsApp <strong>+91 87085 34358</strong></p>
        </div>
      </section>
    </main>
  );
}
