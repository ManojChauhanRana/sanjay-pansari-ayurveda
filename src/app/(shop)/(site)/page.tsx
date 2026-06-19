import { ArrowRight, Award, CheckCircle2, FlaskConical, Leaf, ShieldCheck, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { ImageSlideshow } from "@/components/ui/image-slideshow";
import { categoryTiles, heroSlides, promoBanners, trustBadges } from "@/lib/site-data";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const whyChooseSlides = [
  { src: "/images/client/hospital-waiting-room.png",      alt: "Sanjay Pansari hospital waiting area" },
  { src: "/images/client/hospital-lobby.png",             alt: "Sanjay Pansari hospital lobby" },
  { src: "/images/client/hospital-reception.png",         alt: "Sanjay Pansari hospital reception" },
  { src: "/images/client/hospital-consultation-room.png", alt: "Doctor consultation room" },
  { src: "/images/client/hospital-treatment-room.png",    alt: "Ayurvedic treatment room" },
  { src: "/images/client/hospital-panchakarma-room.png",  alt: "Panchakarma therapy room" },
  { src: "/images/client/hospital-entrance.png",          alt: "Sanjay Pansari hospital entrance" },
  { src: "/images/client/hospital-building-side.png",     alt: "Sanjay Pansari hospital building" },
  { src: "/images/client/hospital-signage-front.png",     alt: "Sanjay Pansari hospital front" },
  { src: "/images/client/hospital-signboard.png",         alt: "Sanjay Pansari Multispeciality Ayurvedic Hospital" },
];

export default async function Home() {
  const supabase = await getSupabaseServerClient();

  const { data: dbProducts } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug')
    .limit(8);

  const products = (dbProducts || []).map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.base_price,
    mrp: p.base_mrp,
    image: p.image_url,
    badge: p.badges?.[0] || "",
    badges: p.badges || [],
    reviews: 0,
    unit: "Standard"
  }));

  return (
    <div className="bg-[#fbfaf4]">

      {/* ── HERO ── */}
      <section className="bg-white">
        <div className="px-0 py-0 md:px-5">
          <a href={heroSlides[0].href} className="relative mx-auto block aspect-[2/1] w-full max-w-[1600px] overflow-hidden bg-black md:rounded-[10px]">
            <Image
              src={heroSlides[0].image}
              alt="Sanjay Pansari Ayurvedic banner"
              fill priority
              className="object-contain"
              sizes="100vw"
            />
            {heroSlides.length > 1 && (
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {heroSlides.map((slide, i) => (
                  <span key={slide.href} className={`h-1.5 w-14 rounded-full ${i === 0 ? "bg-white" : "bg-white/45"}`} />
                ))}
              </div>
            )}
          </a>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#305724] py-6 text-white">
        <div className="container">
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
            {[
              { value: "25+", label: "Years of Experience" },
              { value: "15,000+", label: "Patients Treated" },
              { value: "20+", label: "Ayurvedic Products" },
              { value: "100%", label: "Natural & Herbal" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-white/10 px-4 py-5">
                <p className="text-2xl font-black md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-white/80 md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCROLLING PRODUCT BANNERS ── */}
      <PromoImageScroller />

      {/* ── SHOP BY CONCERN ── */}
      <section className="bg-white py-10 md:py-14">
        <div className="container">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#305724]">Find Your Solution</p>
            <h2 className="mt-2 text-2xl font-bold text-[#1d1d1d] md:text-3xl">Shop by Health Concern</h2>
          </div>
          <div className="mt-5 flex gap-2 overflow-x-auto pb-2 md:justify-center">
            <Link href="/collections/all" className="focus-ring flex min-w-max items-center gap-2 rounded-full bg-[#305724] px-5 py-2 text-sm font-semibold text-white">
              All Products
            </Link>
            {categories?.map((cat) => (
              <Link key={cat.id} href={`/collections/${cat.slug}`}
                className="focus-ring flex min-w-max items-center gap-2 rounded-full border border-[#d8e4d2] bg-[#f3f6ef] px-5 py-2 text-sm font-semibold text-[#305724] transition hover:bg-[#305724] hover:text-white">
                {cat.name}
              </Link>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p as any} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/collections/all" className="inline-flex items-center gap-2 rounded-full border-2 border-[#305724] px-8 py-3 text-sm font-bold text-[#305724] transition hover:bg-[#305724] hover:text-white">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SCROLLING TEXT BANNER ── */}
      <ScrollingBanner />

      {/* ── CATEGORY TILES ── */}
      <section className="bg-[#f3f6ef] py-10 md:py-12">
        <div className="container">
          <div className="mb-6 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#305724]">Browse</p>
            <h2 className="mt-2 text-2xl font-bold text-[#1d1d1d] md:text-3xl">Health Categories</h2>
          </div>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
            {categoryTiles.map((cat) => {
              const Icon = cat.icon;
              return (
                <a key={cat.label} href={cat.href}
                  className="focus-ring group flex flex-col items-center rounded-xl border border-[#dce5d1] bg-white p-4 text-center shadow-sm transition hover:border-[#305724] hover:shadow-md md:p-6">
                  <div className="flex size-12 items-center justify-center rounded-full bg-[#eef5ea] text-[#305724] transition group-hover:bg-[#305724] group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <p className="mt-3 text-xs font-bold text-[#263622] md:text-sm">{cat.label}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BESTSELLERS ── */}
      <section className="bg-white py-10 md:py-14">
        <div className="container">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#305724]">Top Picks</p>
              <h2 className="mt-1 text-2xl font-bold text-[#1d1d1d] md:text-3xl">Customer Bestsellers</h2>
            </div>
            <Link href="/collections/all" className="hidden shrink-0 items-center gap-2 rounded-full border border-[#305724] px-5 py-2 text-sm font-bold text-[#305724] hover:bg-[#305724] hover:text-white md:flex">
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={`best-${p.id}`} product={p as any} />
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCTOR / ABOUT SECTION ── */}
      <section className="bg-[#243c2a] py-12 text-white md:py-16">
        <div className="container">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1.4fr]">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border-4 border-white/20 shadow-2xl">
              <Image
                src="/images/client/clinical_setup.jpg"
                alt="Dr. Sanjay Pansari"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                <p className="text-lg font-black">Dr. Sanjay Pansari</p>
                <p className="text-sm text-white/80">BAMS, Ayurvedic Physician & Founder</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#a8c89e]">About the Doctor</p>
              <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
                25 Years of Healing with<br />
                <span className="text-[#d99a2b]">Ancient Ayurvedic Wisdom</span>
              </h2>
              <p className="mt-5 text-base leading-8 text-white/80">
                Dr. Sanjay Pansari is the founder of Sanjay Pansari Multispeciality Ayurvedic Hospital, Assandh, Haryana. With over 25 years of experience in classical Ayurveda, he has helped more than 15,000 patients recover from chronic and lifestyle diseases using 100% natural herbal formulations.
              </p>
              <p className="mt-4 text-base leading-8 text-white/80">
                His proprietary medicines are formulated from rare herbs, free from side effects, and grounded in traditional Ayurvedic texts — offering lasting results where modern medicine often falls short.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-4">
                {[
                  { icon: Award, text: "BAMS Qualified Physician" },
                  { icon: Users, text: "15,000+ Patients Treated" },
                  { icon: FlaskConical, text: "100% Herbal Formulations" },
                  { icon: ShieldCheck, text: "GMP & ISO Certified" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold">
                    <Icon size={18} className="shrink-0 text-[#d99a2b]" />
                    {text}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/pages/about-us" className="rounded-full bg-[#d99a2b] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#c4881f]">
                  Our Story
                </Link>
                <Link href="/pages/consult-by-vaidya" className="rounded-full border-2 border-white/40 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <section className="bg-[#fbfaf4] py-10 md:py-14">
        <div className="container">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#305724]">Recently Added</p>
              <h2 className="mt-1 text-2xl font-bold text-[#1d1d1d] md:text-3xl">New Arrivals</h2>
            </div>
            <Link href="/collections/all" className="hidden shrink-0 items-center gap-2 rounded-full border border-[#305724] px-5 py-2 text-sm font-bold text-[#305724] hover:bg-[#305724] hover:text-white md:flex">
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {[...products].slice(4, 8).map((p) => (
              <ProductCard key={`new-${p.id}`} product={p as any} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="bg-white py-10 md:py-14">
        <div className="container">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e3d24] to-[#305724] text-white">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <p className="text-xs font-bold uppercase tracking-widest text-[#a8c89e]">Why Choose Us</p>
                <h2 className="mt-3 text-3xl font-black leading-tight">
                  Ayurvedic Healing,<br/>
                  <span className="text-[#d99a2b]">Proven Results</span>
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/80">
                  Every product at Sanjay Pansari is crafted with the finest herbs, tested for purity, and formulated by an experienced Ayurvedic physician. We treat the root cause — not just the symptoms.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Results from the very first use",
                    "No harmful chemicals or steroids",
                    "Personalised consultation available",
                    "Trusted by 15,000+ patients across India",
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm text-white/90">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#7fc97f]" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <Link href="/collections/all" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d99a2b] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#c4881f]">
                  Shop Now <ArrowRight size={16} />
                </Link>
              </div>
              <div className="relative hidden md:block" style={{ minHeight: 420 }}>
                <ImageSlideshow images={whyChooseSlides} intervalMs={3000} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="bg-[#f3f6ef] py-10 md:py-12">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-[#1d1d1d] md:text-3xl">Why Patients Trust Us</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.label} className="flex flex-col items-center rounded-xl border border-[#d9decf] bg-white p-5 text-center shadow-sm">
                  <div className="flex size-12 items-center justify-center rounded-full bg-[#eef5ea]">
                    <Icon className="text-[#315f3f]" size={22} />
                  </div>
                  <p className="mt-3 text-sm font-bold text-[#263622]">{badge.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-white py-10 md:py-14">
        <div className="container">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#305724]">What Patients Say</p>
            <h2 className="mt-2 text-2xl font-bold text-[#1d1d1d] md:text-3xl">Real Stories, Real Results</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: "Rajesh Kumar", location: "Karnal, Haryana", text: "After years of suffering from liver problems, Dr. Pansari's Jigar Amrit gave me relief in just 2 months. Truly miraculous!", rating: 5 },
              { name: "Suresh Sharma", location: "Panipat, Haryana", text: "The Achook capsules transformed my energy levels completely. I feel 20 years younger. 100% natural and no side effects.", rating: 5 },
              { name: "Priya Verma", location: "Kurukshetra, Haryana", text: "Slimo powder helped me lose 8 kg in 3 months without any crash diet. The results are amazing and sustainable.", rating: 5 },
            ].map((t) => (
              <div key={t.name} className="rounded-xl border border-[#e1e3e1] bg-[#fbfaf4] p-6">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#d99a2b" className="text-[#d99a2b]" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-7 text-[#4d5149]">"{t.text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#305724] text-sm font-bold text-white">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#242424]">{t.name}</p>
                    <p className="text-xs text-[#6e725f]">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-[#305724] py-10 md:py-12">
        <div className="container text-center text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-[#a8c89e]">Get Started Today</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">Ready to Start Your Healing Journey?</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/80">
            Consult with Dr. Sanjay Pansari and get a personalised Ayurvedic treatment plan. No chemicals, no side effects — just nature's best.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link href="/pages/consult-by-vaidya" className="rounded-full bg-[#d99a2b] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#c4881f]">
              Book Free Consultation
            </Link>
            <Link href="/collections/all" className="rounded-full border-2 border-white/60 bg-white/10 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-white/20">
              Browse Products
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

function PromoImageScroller() {
  if (!promoBanners.length) return null;
  return (
    <section className="overflow-hidden bg-[#0b0b0b] py-4">
      <div className="flex min-w-max animate-[scroll-left_48s_linear_infinite] gap-4 px-4">
        {[...promoBanners, ...promoBanners].map((image, index) => (
          <div key={`${image.src}-${index}`} className="relative aspect-[5/4] w-[280px] shrink-0 overflow-hidden rounded-md border border-white/10 bg-black md:w-[420px]">
            <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 280px, 420px" />
          </div>
        ))}
      </div>
    </section>
  );
}

function ScrollingBanner() {
  const items = ["ISO Certified", "GMP Certified", "No Added Sugar", "No Extracts Used", "100% Herbal", "25+ Years Experience", "15,000+ Patients", "No Side Effects"];
  return (
    <section className="overflow-hidden border-y border-[#305724]/20 bg-[#eef5ea] py-4 text-[#305724] md:py-5">
      <div className="flex min-w-max animate-[scroll-left_30s_linear_infinite] items-center gap-10 whitespace-nowrap text-sm font-bold md:text-base">
        {[...items, ...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center gap-8">
            {item}
            <Leaf size={14} className="text-[#305724]" />
          </span>
        ))}
      </div>
    </section>
  );
}
