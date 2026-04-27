import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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

export const metadata: Metadata = {
  title: "Consult by Vaidya | Krishna's Herbal & Ayurveda",
  description: "Ayurvedic consultation with expert Ayurvedic Vaidyas."
};

export default function ConsultByVaidyaPage() {
  return (
    <main className="bg-white">
      <section className="bg-white">
        <div className="mx-auto max-w-[1456px] px-5 py-8 md:py-10">
          <div className="overflow-hidden rounded-[10px]">
            <div className="relative aspect-[1440/660] w-full">
              <Image
                src="https://blog.krishnaayurved.com/wp-content/uploads/2026/01/Doc-Consultation-Banner.jpg"
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

            <form className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-[#3f433d]">
                Full Name
                <input type="text" className="mt-2 min-h-11 w-full rounded-md border border-[#d8ddd4] px-4 text-sm text-[#242424] outline-none ring-0 transition focus:border-[#305724]" placeholder="Enter your name" />
              </label>
              <label className="text-sm font-medium text-[#3f433d]">
                Phone Number
                <input type="tel" className="mt-2 min-h-11 w-full rounded-md border border-[#d8ddd4] px-4 text-sm text-[#242424] outline-none ring-0 transition focus:border-[#305724]" placeholder="Enter your number" />
              </label>
              <label className="text-sm font-medium text-[#3f433d]">
                Email
                <input type="email" className="mt-2 min-h-11 w-full rounded-md border border-[#d8ddd4] px-4 text-sm text-[#242424] outline-none ring-0 transition focus:border-[#305724]" placeholder="Enter your email" />
              </label>
              <label className="text-sm font-medium text-[#3f433d]">
                Preferred Slot
                <select className="mt-2 min-h-11 w-full rounded-md border border-[#d8ddd4] px-4 text-sm text-[#242424] outline-none ring-0 transition focus:border-[#305724]">
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                </select>
              </label>
              <label className="text-sm font-medium text-[#3f433d] md:col-span-2">
                Concern
                <textarea className="mt-2 min-h-32 w-full rounded-md border border-[#d8ddd4] px-4 py-3 text-sm text-[#242424] outline-none ring-0 transition focus:border-[#305724]" placeholder="Tell us briefly what you need help with" />
              </label>
              <div className="md:col-span-2">
                <button type="button" className="min-h-12 rounded-md bg-[#305724] px-6 text-sm font-semibold text-white transition hover:bg-[#1e432b]">
                  Book Appointment
                </button>
              </div>
            </form>
          </div>

          <aside className="rounded-[8px] border border-[#e1e3e1] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-[#242424]">Consultation support</h2>
            <p className="mt-4 text-sm leading-7 text-[#5d6258]">
              This page is now rebuilt locally from the source structure, with the same overall banner, headline, booking section, and FAQ layout.
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
