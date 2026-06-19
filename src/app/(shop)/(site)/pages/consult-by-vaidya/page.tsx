"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { siteContact } from "@/lib/site-data";

const faqs = [
  {
    question: "What are the online Ayurvedic consultation charges?",
    answer: "Charges for ayurvedic consultation are Rs. 200 per consultation call."
  },
  {
    question: "How fast is the medicine shipped?",
    answer: "Orders are prepared quickly after confirmation, and delivery timelines depend on your location."
  },
  {
    question: "How can I reschedule my appointment?",
    answer: "If you miss a slot or need a change, contact the care team and we will help you move the appointment to the next available time."
  },
  {
    question: "What is the mode of consultation?",
    answer: "Consultations are handled online through a telephonic call."
  },
  {
    question: "Whom do I need to reach out if I have any queries regarding the products?",
    answer: `Please contact our support team at ${siteContact.phone} or ${siteContact.email}.`
  },
  {
    question: "Is it safe to share personal information and reports with the doctors?",
    answer: "Yes. Consultation details and any reports shared for case understanding are treated as private."
  }
];

export default function ConsultByVaidyaPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", slot: "Morning", concern: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = `Hi Dr. Sanjay Pansari,\n\nI would like to book a consultation.\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Email:* ${form.email || "N/A"}\n*Preferred Slot:* ${form.slot}\n*Concern:* ${form.concern}`;
    const url = `https://wa.me/918708534358?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }


  return (
    <main className="bg-white">
      <section className="bg-white">
        <div className="mx-auto max-w-[1456px] px-5 py-8 md:py-10">
          <div className="overflow-hidden rounded-[10px]">
            <div className="relative aspect-[1440/660] w-full">
              <Image
                src="/images/client/gallery/sanjay-gallery-01.png"
                alt="Consult by Vaidya"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>

          <div className="mx-auto max-w-[980px] py-8 text-center">
            <h1 className="text-[28px] font-medium leading-tight text-[#242424] md:text-[42px]">Ayurvedic consultation with expert Ayurvedic Vaidyas</h1>
            <p className="mx-auto mt-5 max-w-[860px] text-base leading-8 text-[#5d6258]">
              Get a consultation from the best ayurvedic Vaidyas along with the best herbal solutions crafted for you.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf4]">
        <div className="mx-auto grid max-w-[1456px] gap-8 px-5 py-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[8px] border border-[#e1e3e1] bg-white p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-[#e8ebdf] pb-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6e725f]">Book Appointment</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#242424]">Consult with a Vaidya</h2>
              </div>
              <div className="rounded-full bg-[#f3f6ef] px-4 py-2 text-sm font-semibold text-[#305724]">Rs. 200</div>
            </div>

            <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
              <label className="text-sm font-medium text-[#3f433d]">
                Full Name *
                <input required name="name" type="text" value={form.name} onChange={handleChange} className="mt-2 min-h-11 w-full rounded-md border border-[#d8ddd4] px-4 text-sm text-[#242424] outline-none ring-0 transition focus:border-[#305724]" placeholder="Enter your name" />
              </label>
              <label className="text-sm font-medium text-[#3f433d]">
                Phone Number *
                <input required name="phone" type="tel" value={form.phone} onChange={handleChange} className="mt-2 min-h-11 w-full rounded-md border border-[#d8ddd4] px-4 text-sm text-[#242424] outline-none ring-0 transition focus:border-[#305724]" placeholder="Enter your number" />
              </label>
              <label className="text-sm font-medium text-[#3f433d]">
                Email
                <input name="email" type="email" value={form.email} onChange={handleChange} className="mt-2 min-h-11 w-full rounded-md border border-[#d8ddd4] px-4 text-sm text-[#242424] outline-none ring-0 transition focus:border-[#305724]" placeholder="Enter your email" />
              </label>
              <label className="text-sm font-medium text-[#3f433d]">
                Preferred Slot
                <select name="slot" value={form.slot} onChange={handleChange} className="mt-2 min-h-11 w-full rounded-md border border-[#d8ddd4] px-4 text-sm text-[#242424] outline-none ring-0 transition focus:border-[#305724]">
                  <option>Morning (9 AM – 12 PM)</option>
                  <option>Afternoon (12 PM – 4 PM)</option>
                  <option>Evening (4 PM – 7 PM)</option>
                </select>
              </label>
              <label className="text-sm font-medium text-[#3f433d] md:col-span-2">
                Your Health Concern *
                <textarea required name="concern" value={form.concern} onChange={handleChange} className="mt-2 min-h-32 w-full rounded-md border border-[#d8ddd4] px-4 py-3 text-sm text-[#242424] outline-none ring-0 transition focus:border-[#305724]" placeholder="Tell us briefly what you need help with (e.g. liver problem, weight loss, men's health)" />
              </label>
              <div className="md:col-span-2">
                <button type="submit" className="inline-flex items-center gap-3 min-h-12 rounded-md bg-[#25d366] px-6 text-sm font-bold text-white transition hover:bg-[#1ebe5d]">
                  <svg viewBox="0 0 32 32" fill="white" className="size-5">
                    <path d="M16 0C7.164 0 0 7.163 0 16c0 2.824.737 5.477 2.027 7.785L0 32l8.468-2.001A15.942 15.942 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.27 19.455c-.398-.199-2.355-1.163-2.72-1.295-.366-.133-.632-.199-.898.199-.266.398-1.031 1.295-1.264 1.561-.232.265-.465.298-.863.1-.398-.199-1.681-.62-3.203-1.977-1.184-1.056-1.983-2.361-2.215-2.759-.232-.398-.025-.614.174-.812.179-.178.398-.465.597-.698.199-.232.265-.398.398-.664.133-.265.066-.498-.033-.697-.1-.199-.898-2.165-1.23-2.963-.324-.778-.654-.673-.898-.685l-.765-.013c-.266 0-.698.1-1.064.498s-1.397 1.362-1.397 3.322 1.43 3.853 1.629 4.119c.199.265 2.814 4.297 6.817 6.026.953.411 1.696.657 2.276.841.956.304 1.826.261 2.514.158.767-.114 2.355-.963 2.688-1.893.332-.93.332-1.727.232-1.893-.1-.166-.366-.266-.764-.465z"/>
                  </svg>
                  Send via WhatsApp & Book Appointment
                </button>
                <p className="mt-2 text-xs text-[#6e725f]">This will open WhatsApp with your details pre-filled for instant confirmation.</p>
              </div>
            </form>
          </div>

          <aside className="rounded-[8px] border border-[#e1e3e1] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-[#242424]">Consultation support</h2>
            <p className="mt-4 text-sm leading-7 text-[#5d6258]">
              Share your concern and the care team will help you with Ayurvedic consultation support.
            </p>
            <div className="mt-6 space-y-5 text-sm text-[#3f433d]">
              <div>
                <p className="font-semibold text-[#242424]">Phone</p>
                <p className="mt-1">{siteContact.phone}</p>
              </div>
              <div>
                <p className="font-semibold text-[#242424]">WhatsApp</p>
                <Link href={siteContact.whatsappUrl} className="mt-1 block text-[#305724] hover:text-[#1e432b]">
                  {siteContact.whatsapp}
                </Link>
              </div>
              <div>
                <p className="font-semibold text-[#242424]">Email</p>
                <Link href={`mailto:${siteContact.email}`} className="mt-1 block text-[#305724] hover:text-[#1e432b]">
                  {siteContact.email}
                </Link>
              </div>
              <div>
                <p className="font-semibold text-[#242424]">Hours</p>
                <p className="mt-1">{siteContact.hours}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1100px] px-5 py-12 md:py-16">
          <h2 className="text-center text-[28px] font-semibold text-[#242424] md:text-[34px]">FAQs</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-[8px] bg-[rgba(43,83,43,0.06)] px-5 py-4">
                <summary className="cursor-pointer list-none pr-8 text-base font-medium text-[#242424]">{faq.question}</summary>
                <p className="mt-3 text-sm leading-7 text-[#4d5149]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
