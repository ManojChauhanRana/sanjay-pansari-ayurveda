import { Brain, Eye, Flame, HeartPulse, Leaf, PackageCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";

export type Product = {
  id: string;
  name: string;
  concern?: string;
  price: number;
  mrp?: number;
  reviews?: number;
  image?: string | null;
  badge?: string;
  badges?: string[];
  unit?: string;
  href?: string;
  slug?: string;
  category_ids?: string[];
};

export type CollectionPageConfig = {
  slug: string;
  title: string;
  description: string;
};

export const navConcerns = [
  "Sugar Care",
  "Joint Pain",
  "Paralysis Care",
  "Gall Bladder Stone",
  "Men's Wellness",
  "Digestive Wellness",
  "Pain Relief",
  "Daily Wellness"
];

export const navProducts = [
  "Capsules",
  "Juice",
  "Churna",
  "Powder",
  "Tablet",
  "Oil",
  "Combos",
  "Offers"
];

export const heroSlides = [
  {
    image: "/images/client/home-banner.png",
    mobileImage: "/images/client/home-banner.png",
    href: "/collections/all"
  }
];

export const galleryImages = [
  { src: "/images/client/gallery/sanjay-gallery-01.png", alt: "Sanjay Pansari Long Journey banner", orientation: "landscape" },
  { src: "/images/client/gallery/sanjay-gallery-02.png", alt: "Sanjay Pansari Slimo capsule banner", orientation: "landscape" },
  { src: "/images/client/gallery/sanjay-gallery-03.png", alt: "Sanjay Pansari Full Count capsule banner", orientation: "landscape" },
  { src: "/images/client/gallery/sanjay-gallery-04.png", alt: "Sanjay Pansari Slimo capsule creative", orientation: "portrait" },
  { src: "/images/client/gallery/sanjay-gallery-05.png", alt: "Sanjay Pansari Long Journey capsule banner", orientation: "landscape" },
  { src: "/images/client/gallery/sanjay-gallery-06.png", alt: "Sanjay Pansari Full Count capsule creative", orientation: "portrait" },
  { src: "/images/client/gallery/sanjay-gallery-07.png", alt: "Sanjay Pansari Achook capsule creative", orientation: "portrait" },
  { src: "/images/client/gallery/sanjay-gallery-08.png", alt: "Sanjay Pansari Jigar Amrit creative", orientation: "portrait" },
  { src: "/images/client/gallery/sanjay-gallery-09.png", alt: "Sanjay Pansari Balwan capsule creative", orientation: "portrait" },
  { src: "/images/client/gallery/sanjay-gallery-10.png", alt: "Sanjay Pansari Majun creative", orientation: "portrait" },
  { src: "/images/client/gallery/sanjay-gallery-11.png", alt: "Sanjay Pansari joint pain creative", orientation: "landscape" },
  { src: "/images/client/gallery/sanjay-gallery-12.png", alt: "Sanjay Pansari Long Journey creative", orientation: "portrait" },
  { src: "/images/client/gallery/sanjay-gallery-13.png", alt: "Sanjay Pansari Shudh Swarna creative", orientation: "portrait" },
  { src: "/images/client/gallery/sanjay-gallery-14.png", alt: "Sanjay Pansari Achook banner", orientation: "landscape" },
  { src: "/images/client/gallery/sanjay-gallery-15.png", alt: "Sanjay Pansari Jigar Amrit banner", orientation: "landscape" },
  { src: "/images/client/gallery/sanjay-gallery-16.png", alt: "Sanjay Pansari Balwan banner", orientation: "landscape" },
  { src: "/images/client/gallery/sanjay-gallery-17.png", alt: "Sanjay Pansari joint pain creative", orientation: "portrait" }
] as const;

export const promoBanners = galleryImages.filter((image) => image.orientation === "landscape");

export const categoryTiles = [
  { label: "Sugar Care", href: "/collections/all", icon: Sparkles },
  { label: "Joint Pain", href: "/collections/all", icon: Flame },
  { label: "Paralysis Care", href: "/collections/all", icon: Brain },
  { label: "Gall Bladder Stone", href: "/collections/all", icon: ShieldCheck },
  { label: "Men's Wellness", href: "/collections/all", icon: HeartPulse },
  { label: "Eye Wellness", href: "/collections/all", icon: Eye }
];

export const trustBadges = [
  {
    label: "Natural Herbs",
    icon: Leaf
  },
  {
    label: "Ayurvedic Care",
    icon: ShieldCheck
  },
  {
    label: "Quality Products",
    icon: Sparkles
  },
  {
    label: "Secure Packing",
    icon: PackageCheck
  },
  {
    label: "Fast Delivery",
    icon: Truck
  },
  {
    label: "Wellness Support",
    icon: HeartPulse
  }
];

export const collectionPageConfigs: CollectionPageConfig[] = [
  {
    slug: "all-products",
    title: "All Products",
    description: "Browse the complete Ayurvedic collection."
  },
  {
    slug: "combos",
    title: "Combos",
    description: "Curated product combinations for daily wellness routines."
  },
  {
    slug: "offers",
    title: "Offers",
    description: "Current discounts and promotional product highlights."
  }
];

export function getCollectionPageConfig(slug: string) {
  return collectionPageConfigs.find((item) => item.slug === slug);
}

export const siteBrand = {
  name: "Sanjay Pansari Assandh",
  firstName: "Sanjay",
  lastName: "Pansari",
  suffix: "Assandh",
  subtitle: "Ayurvedic Hospital",
  logo: "/images/client/logo.png"
};

export const siteContact = {
  phone: "+91 83970 80000",
  whatsapp: "+91 87085 34358",
  whatsappUrl: "https://wa.me/918708534358",
  email: "sanjaypansariassandh@gmail.com",
  address: "Assandh, Dist. Karnal, Haryana",
  addressLine2: "View location on Google Maps",
  mapUrl: "https://maps.app.goo.gl/Goe6v5ocFzAEB6x47?g_st=ic",
  businessName: "Sanjay Pansari Assandh",
  hours: "9:00 AM - 7:00 PM"
};

export const siteSocials = [
  { label: "Facebook", href: "https://www.facebook.com/share/1HjyCWVoB7/?mibextid=wwXIfr" },
  { label: "Instagram", href: "https://www.instagram.com/sanjay_pansari_assandh?igsh=djliamxyNHJ5cnlw" }
] as const;

export const siteDescription =
  "Special treatment for erectile dysfunction, sugar, joint pain, paralysis, and gall bladder stone.";
