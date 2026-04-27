import { Brain, Droplets, Eye, Flame, HeartPulse, Leaf, PackageCheck, ShieldCheck, Sparkles, Truck, Venus } from "lucide-react";

const cdn = (path: string) => `https://krishnaayurved.com${path}`;

export type Product = {
  id: string;
  name: string;
  concern: string;
  price: number;
  mrp?: number;
  reviews: number;
  image: string;
  badge?: string;
  unit?: string;
  href?: string;
};

export function getProductSlug(product: Product) {
  return product.href?.split("/").filter(Boolean).at(-1) ?? product.id;
}

export function getProductBySlug(slug: string) {
  return [...collectionProducts, ...products].find((product) => getProductSlug(product) === slug);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return collectionProducts.filter((item) => item.id !== product.id && item.concern === product.concern).slice(0, limit);
}

export type CollectionPageConfig = {
  slug: string;
  title: string;
  description: string;
  productIds?: string[];
  productConcerns?: string[];
};

export const navConcerns = [
  "Brain Wellness",
  "Cardiac Wellness",
  "Daily Wellness",
  "Diabetic Wellness",
  "Digestive Wellness",
  "Eye Wellness",
  "Hair Wellness",
  "Immunity Wellness",
  "Kidney Wellness",
  "Liver Wellness",
  "Men’s Wellness",
  "Pain Reliever",
  "Skin Wellness",
  "Stamina Booster",
  "Women’s Wellness"
];

export const navProducts = [
  "Juice",
  "Churna",
  "Powder",
  "Tablet",
  "Bhasma",
  "Guggul",
  "Skin Care",
  "Hair Care",
  "Herbal Oil",
  "Edible Oil",
  "Exclusive"
];

export type MegaMenuItem = {
  label: string;
  href: string;
  image?: string;
};

export const headerCategoryItems: MegaMenuItem[] = [
  { label: "Brain Wellness", href: "/collections/brain-wellness", image: cdn("/cdn/shop/collections/Brain_Wellness.jpg?v=1754031082&width=3840") },
  { label: "Cardiac Wellness", href: "/collections/cardiac-wellness", image: cdn("/cdn/shop/collections/1200x1200-01.jpg?v=1754031057&width=3840") },
  { label: "Daily Wellness", href: "/collections/daily-wellness", image: cdn("/cdn/shop/collections/Daily_Wellness.jpg?v=1754031029&width=3840") },
  { label: "Diabetic Wellness", href: "/collections/diabetic-wellness", image: cdn("/cdn/shop/collections/Category_banner-04.jpg?v=1754031005&width=3840") },
  { label: "Digestive Wellness", href: "/collections/digestive-wellness", image: cdn("/cdn/shop/collections/Category_banner-02.jpg?v=1754030979&width=3840") },
  { label: "Eye Wellness", href: "/collections/eye-wellness", image: cdn("/cdn/shop/collections/Eye_Wellness.jpg?v=1754030953&width=3840") },
  { label: "Hair Wellness", href: "/collections/hair-wellness", image: cdn("/cdn/shop/collections/1200x1200-04.jpg?v=1754030930&width=3840") },
  { label: "Immunity Wellness", href: "/collections/immunity-wellness", image: cdn("/cdn/shop/collections/Category_banner-01.jpg?v=1754030903&width=3840") },
  { label: "Kidney Wellness", href: "/collections/kidney-wellness", image: cdn("/cdn/shop/collections/Kidney_Wellness.jpg?v=1754030873&width=3840") },
  { label: "Liver Wellness", href: "/collections/liver-wellness", image: cdn("/cdn/shop/collections/Liver_Wellness.jpg?v=1754030844&width=3840") },
  { label: "Men’s Wellness", href: "/collections/men-s-wellness", image: cdn("/cdn/shop/collections/1200x1200-07.jpg?v=1754030815&width=3840") },
  { label: "Pain Reliever", href: "/collections/pain-reliever", image: cdn("/cdn/shop/collections/Category_banner-03.jpg?v=1754030744&width=3840") },
  { label: "Skin Wellness", href: "/collections/skin-wellness", image: cdn("/cdn/shop/collections/Category_banner-05.jpg?v=1754030368&width=3840") },
  { label: "Stamina Booster", href: "/collections/stamina-booster", image: cdn("/cdn/shop/collections/1200x1200-10.jpg?v=1754030715&width=3840") },
  { label: "Women’s Wellness", href: "/collections/women-s-wellness", image: cdn("/cdn/shop/collections/women_wellness.jpg?v=1754030688&width=3840") },
  { label: "Blood Purify", href: "/collections/blood-purifier", image: cdn("/cdn/shop/collections/Category_banner-06.jpg?v=1754038305&width=3840") }
];

export const headerProductItems: MegaMenuItem[] = [
  { label: "Juice", href: "/collections/juices", image: cdn("/cdn/shop/collections/juices-category-image1.jpg?v=1623839918&width=3840") },
  { label: "Churna", href: "/collections/herbal-powders-churna", image: cdn("/cdn/shop/collections/herbal-powders-category-image1.jpg?v=1623839518&width=3840") },
  { label: "Powder", href: "/collections/herbal-powders", image: cdn("/cdn/shop/files/A3_copy.png?v=1766232258&width=3840") },
  { label: "Tablet", href: "/collections/tablets", image: cdn("/cdn/shop/collections/1200x1200-09.jpg?v=1623838397&width=3840") },
  { label: "Bhasma", href: "/collections/bhasma" },
  { label: "Guggul", href: "/collections/guggul", image: cdn("/cdn/shop/files/A_c1138e14-7bd7-4a15-add7-13e1b6e564f1.png?v=1766396215&width=3840") },
  { label: "Skin Care", href: "/collections/skin-care", image: cdn("/cdn/shop/files/Skin_Pimple_1_3249bc4d-4707-49b3-bc5c-6cfe334e5c0b.jpg?v=1758272006&width=3840") },
  { label: "Hair Care", href: "/collections/hair-care", image: cdn("/cdn/shop/files/1A_a0c2bd1a-3d25-4ef6-93c0-149acacbc7b6.jpg?v=1766391263&width=3840") },
  { label: "Herbal Oil", href: "/collections/herbal-oil", image: cdn("/cdn/shop/collections/1200x1200-02.jpg?v=1623838895&width=3840") },
  { label: "Edible Oil", href: "/collections/edible-oil", image: cdn("/cdn/shop/files/1a_55d2bd6b-4d3b-489a-9e5b-918aa2d034cc.jpg?v=1766385083&width=3840") },
  { label: "Exclusive", href: "/collections/exclusive", image: cdn("/cdn/shop/files/Chyawanprash_Preservative_Free.jpg?v=1764141901&width=3840") }
];

export const concernTiles = [
  {
    name: "Best Solutions",
    image: cdn("/cdn/shop/files/best_seller_-_Desktop.jpg?v=1771418093&width=300"),
    icon: Sparkles
  },
  {
    name: "Diabetic Wellness",
    image: cdn("/cdn/shop/collections/Category_banner-04.jpg?crop=center&height=60&v=1754031005&width=60"),
    icon: Droplets
  },
  {
    name: "Digestive Wellness",
    image: cdn("/cdn/shop/collections/Category_banner-02.jpg?crop=center&height=60&v=1754030979&width=60"),
    icon: Leaf
  },
  {
    name: "Pain Reliever",
    image: cdn("/cdn/shop/collections/Category_banner-03.jpg?crop=center&height=60&v=1754030744&width=60"),
    icon: Flame
  },
  {
    name: "Women’s Wellness",
    image: cdn("/cdn/shop/collections/women_wellness.jpg?crop=center&height=60&v=1754030688&width=60"),
    icon: Venus
  },
  {
    name: "Skin Wellness",
    image: cdn("/cdn/shop/collections/Category_banner-05.jpg?crop=center&height=60&v=1754030368&width=60"),
    icon: Sparkles
  },
  {
    name: "Cardiac Wellness",
    image: cdn("/cdn/shop/collections/1200x1200-01.jpg?crop=center&height=60&v=1754031057&width=60"),
    icon: HeartPulse
  }
];

export const heroSlides = [
  {
    image: cdn("/cdn/shop/files/Bovisolv_Banner_jpg.jpg?v=1776242370&width=3840"),
    mobileImage: cdn("/cdn/shop/files/Bovisolv_Mobile_Banner_jpg.jpg?v=1776242450&width=1500"),
    href: "/products/bovisolv-juice"
  },
  {
    image: cdn("/cdn/shop/files/She-Care-Web-Banner.jpg?v=1771417739&width=3840"),
    mobileImage: cdn("/cdn/shop/files/She-care-mobile-version.jpg?v=1771417790&width=1500"),
    href: "/products/she-care-juice"
  },
  {
    image: cdn("/cdn/shop/files/Diabic-Banner---Web.jpg?v=1771417849&width=3840"),
    mobileImage: cdn("/cdn/shop/files/Diabic-Bannwe---Mobile.jpg?v=1771417887&width=1500"),
    href: "/products/diabic-care-juice-regulates-diabetes-1"
  }
];

export const products: Product[] = [
  {
    id: "she-care-juice",
    name: "She Care Juice",
    concern: "Women’s Wellness",
    price: 541,
    mrp: 543,
    reviews: 8916,
    badge: "Best Seller",
    unit: "1000 ml",
    image: cdn("/cdn/shop/files/SheCare_1.jpg?v=1748606640&width=1500")
  },
  {
    id: "diabic-care-juice",
    name: "Diabic Care Juice",
    concern: "Diabetic Wellness",
    price: 457,
    mrp: 459,
    reviews: 8335,
    badge: "Best Seller",
    unit: "1000 ml",
    image: cdn("/cdn/shop/files/2_8097f48d-7357-4843-a118-94ef19558620.jpg?v=1753249574&width=1500")
  },
  {
    id: "cholesterol-care-juice",
    name: "Cholesterol Care Juice",
    concern: "Cardiac Wellness",
    price: 560,
    mrp: 562,
    reviews: 6398,
    unit: "1000 ml",
    image: cdn("/cdn/shop/files/CholesterolCare_2.jpg?v=1748606415&width=1500")
  },
  {
    id: "shapefix-juice",
    name: "Shapefix Juice",
    concern: "Best Solutions",
    price: 476,
    mrp: 478,
    reviews: 5750,
    unit: "1000 ml",
    image: cdn("/cdn/shop/files/ShapeFix_1.jpg?v=1748607022&width=1500")
  },
  {
    id: "bovisolv-juice",
    name: "Bovisolv Juice (IBS Care)",
    concern: "Digestive Wellness",
    price: 578,
    mrp: 580,
    reviews: 5306,
    unit: "1000 ml",
    image: cdn("/cdn/shop/files/2a_56e20d6a-212d-432f-9721-ea0a2c767844.jpg?v=1774502400&width=1500")
  },
  {
    id: "thyro-balance-juice",
    name: "Thyro Balance Juice",
    concern: "Best Solutions",
    price: 513,
    mrp: 515,
    reviews: 5349,
    unit: "1000 ml",
    image: cdn("/cdn/shop/files/ThyroBalance_1.jpg?v=1748607195&width=1500")
  },
  {
    id: "freshoeaze-powder",
    name: "Freshoeaze Powder",
    concern: "Digestive Wellness",
    price: 253,
    mrp: 255,
    reviews: 1,
    unit: "100 gm",
    image: cdn("/cdn/shop/files/Freshoeaze_1.jpg?v=1771420894&width=1500")
  },
  {
    id: "joint-pain-care-juice",
    name: "Joint Pain Care Juice",
    concern: "Pain Reliever",
    price: 476,
    mrp: 478,
    reviews: 4018,
    unit: "1000 ml",
    image: cdn("/cdn/shop/files/JointPainCare_1.jpg?v=1748606725&width=1500")
  }
];

export const collectionProducts: Product[] = [
  {
    id: "acidant-juice",
    name: "Acidant Juice",
    concern: "Juices",
    price: 528,
    mrp: 530,
    reviews: 128,
    unit: "1000ml | Pack of 1",
    href: "/products/acidant-juice",
    image: cdn("/cdn/shop/files/2A_d3c38e89-3c81-4416-ad92-88e6184afbe9.jpg?v=1764327675&width=1500")
  },
  {
    id: "acidity-care-juice",
    name: "Acidity Care Juice",
    concern: "Juices",
    price: 476,
    mrp: 478,
    reviews: 221,
    unit: "1000ml | Pack of 1",
    href: "/products/acidity-care-juice",
    image: cdn("/cdn/shop/files/Acidity_1_ab85cd7a-f4f3-4b3e-aba8-fd72aab2204b.jpg?v=1768886534&width=1500")
  },
  {
    id: "amla-juice-acidity-care-juice",
    name: "Acidity Care Juice 1000 ml | Amla Juice 1000 ml",
    concern: "Combos",
    price: 663,
    mrp: 665,
    reviews: 67,
    href: "/products/amla-juice-1000-ml-acidity-care-juice-1000-ml",
    image: cdn("/cdn/shop/files/amla_Acidity.jpg?v=1703675528&width=1500")
  },
  {
    id: "acidity-care-juice-bael-juice",
    name: "Acidity Care Juice 1000 ml | Bael Juice 1000 ml",
    concern: "Combos",
    price: 869,
    mrp: 871,
    reviews: 73,
    href: "/products/acidity-care-juice-1000-ml-bael-juice-1000-ml",
    image: cdn("/cdn/shop/files/Acidity_Bael.jpg?v=1683716540&width=1500")
  },
  {
    id: "acidity-care-juice-diabic-care-juice",
    name: "Acidity Care Juice 1000 ml | Diabic Care Juice 1000 ml",
    concern: "Combos",
    price: 907,
    mrp: 909,
    reviews: 65,
    href: "/products/acidity-care-juice-1000-ml-diabic-care-juice-1000-ml",
    image: cdn("/cdn/shop/files/Acidity_Diabic.jpg?v=1683713003&width=1500")
  },
  {
    id: "acidity-care-juice-triphala-juice",
    name: "Acidity Care Juice 1000 ml | Triphala Juice 1000 ml",
    concern: "Combos",
    price: 729,
    mrp: 731,
    reviews: 58,
    href: "/products/acidity-care-juice-1000-ml-triphala-juice-1000-ml",
    image: cdn("/cdn/shop/files/AcidityCare_TriphalaJuice.jpg?v=1703673687&width=1500")
  },
  {
    id: "ajmodadi-churna",
    name: "Ajmodadi Churna",
    concern: "Herbal Powders/Churna",
    price: 115,
    mrp: 117,
    reviews: 42,
    unit: "50gm | Pack of 1",
    href: "/products/ajmodadi-churna-best-for-arthritis",
    image: cdn("/cdn/shop/files/A_c39d2c9c-e4f4-4ae1-8465-e7827bf4a17f.png?v=1766141047&width=1500")
  },
  {
    id: "aloe-saffron-gel",
    name: "Aloe Saffron Gel",
    concern: "Cosmetics",
    price: 118,
    mrp: 120,
    reviews: 89,
    unit: "100gm | Pack of 1",
    href: "/products/aloe-saffron-gel-anti-tan-and-skin-rejuvenation",
    image: cdn("/cdn/shop/files/1A_80054929-3f1e-4401-9a86-0241f072a4fa.jpg?v=1766393241&width=1500")
  },
  {
    id: "aloevera-gel",
    name: "Aloe vera Gel",
    concern: "Cosmetics",
    price: 88,
    mrp: 90,
    reviews: 156,
    unit: "100gm | Pack of 1",
    href: "/products/aloevera-gel-natural-relief-for-all-skin-type",
    image: cdn("/cdn/shop/files/3_c09764b5-1cc3-421a-b78c-04036ed388fd.png?v=1766392087&width=1500")
  },
  {
    id: "aloe-vera-juice",
    name: "Aloe Vera Juice",
    concern: "Juices",
    price: 232,
    mrp: 234,
    reviews: 246,
    unit: "1000ml | Pack of 1",
    href: "/products/aloe-vera-juice",
    image: cdn("/cdn/shop/files/AloeVera_1_2e86f608-d12b-4df6-9684-7e28fbd71dc0.jpg?v=1768469332&width=1500")
  },
  {
    id: "aloe-amla-gel-combo",
    name: "Aloe Vera Juice 1000 ml | Amla Juice 1000 ml | Aloe Vera Gel 250 gm",
    concern: "Combos",
    price: 629,
    mrp: 631,
    reviews: 31,
    href: "/products/aloe-vera-juice-1000-ml-amla-juice-1000-ml-aloe-vera-gel-250-gm-skin-wellness-combo",
    image: cdn("/cdn/shop/products/amlaaloegel.jpg?v=1667281824&width=1500")
  },
  {
    id: "aloe-wheatgrass-combo",
    name: "Aloe Vera Juice 1000 ml | Wheatgrass Juice 1000 ml",
    concern: "Combos",
    price: 625,
    mrp: 655,
    reviews: 38,
    href: "/products/aloe-vera-juice-1000-ml-wheatgrass-juice-1000-ml",
    image: cdn("/cdn/shop/files/Aloe_wheatgrass.jpg?v=1683716558&width=1500")
  },
  {
    id: "aloevera-amla-juice",
    name: "Aloe Vera Juice 1000ml | Amla Juice 1000ml",
    concern: "Combos",
    price: 419,
    mrp: 449,
    reviews: 84,
    href: "/products/aloe-vera-juice-1000ml",
    image: cdn("/cdn/shop/products/AloeAmla.jpg?v=1667282085&width=1500")
  },
  {
    id: "aloevera-triphala-juice",
    name: "Aloe Vera Juice 1000ml | Triphala Juice 1000ml",
    concern: "Combos",
    price: 485,
    mrp: 487,
    reviews: 29,
    href: "/products/aloe-vera-juice-1000ml-triphala-juice-1000ml-digesitive-wellness-combo",
    image: cdn("/cdn/shop/products/AloeTriphala.jpg?v=1667283554&width=1500")
  },
  {
    id: "aloe-amla-mix-juice",
    name: "Aloe-Amla Mix Juice",
    concern: "Juices",
    price: 260,
    mrp: 262,
    reviews: 193,
    unit: "1000ml | Pack of 1",
    href: "/products/aloe-amla-mix-juice",
    image: cdn("/cdn/shop/files/Aloe_Amla_1_f342e7e2-6e44-4f68-b5e2-e556bb67bc72.jpg?v=1758185024&width=1500")
  },
  {
    id: "aloevera-face-wash",
    name: "Aloevera Face wash",
    concern: "Cosmetics",
    price: 108,
    mrp: 110,
    reviews: 76,
    unit: "100ml | Pack of 1",
    href: "/products/aloevera-face-wash-gel-relief-for-dry-skin",
    image: cdn("/cdn/shop/files/1A_42d2de9c-8531-4a58-8252-88709d23ceab.jpg?v=1766391891&width=1500")
  },
  {
    id: "aloevera-shampoo",
    name: "Aloevera Shampoo",
    concern: "Cosmetics",
    price: 220,
    mrp: 222,
    reviews: 111,
    unit: "500ml | Pack of 1",
    href: "/products/aloevera-shampoo-cleans-gently-and-nourishes-hair",
    image: cdn("/cdn/shop/files/JPG_c274763e-683f-4a30-a1f7-6ee3ae67438d.jpg?v=1766390817&width=1500")
  },
  {
    id: "aloevera-walnut-scrub",
    name: "Aloevera Walnut Scrub",
    concern: "Cosmetics",
    price: 148,
    mrp: 150,
    reviews: 64,
    unit: "100gm | Pack of 1",
    href: "/products/aloevera-walnut-scrub-gently-scrub-skin-impurities",
    image: cdn("/cdn/shop/files/1A_1da86577-b264-4d90-8ef5-3ed0a513644c.jpg?v=1766392747&width=1500")
  },
  {
    id: "amla-aloe-wheatgrass-haldi-tulsi",
    name: "Amla Aloe Vera Wheat grass Haldi Tulsi Juice",
    concern: "Juices",
    price: 421,
    mrp: 423,
    reviews: 171,
    unit: "1000ml | Pack of 1",
    href: "/products/amla-aloe-vera-wheat-grass-haldi-tulsi-juice-secret-to-disease-free-life",
    image: cdn("/cdn/shop/files/AAWHT_1000_1_80b6bb0c-50e1-4b2a-b11d-b57d7d636315.jpg?v=1768976988&width=1500")
  },
  {
    id: "amla-karela-jamun-combo",
    name: "Amla Aloe Vera Wheat grass Haldi Tulsi Juice 1000 ml | Karela Jamun Mix Juice 1000 ml",
    concern: "Combos",
    price: 672,
    mrp: 674,
    reviews: 45,
    href: "/products/amla-aloe-vera-wheat-grass-haldi-tulsi-juice-1000-ml-karela-jamun-mix-juice-1000-ml",
    image: cdn("/cdn/shop/files/AAWGHT_KJ.jpg?v=1683712673&width=1500")
  }
];

export const comboProducts: Product[] = [
  {
    id: "combo-cholesterol-diabic",
    name: "Cholesterol Care Juice 1000 ml | Diabic Care Juice 1000 ml",
    concern: "Combos",
    price: 991,
    reviews: 74,
    href: "/products/achieve-heartfelt-harmony-with-balanced-sugar",
    image: cdn("/cdn/shop/files/Diabic-_-Cholesterol-Care-Juice-B1.jpg?v=1737792932")
  },
  {
    id: "combo-harshringar-joint-pain",
    name: "Harshringar Leaf Juice 1000 ml | Joint Pain Care Juice 1000 ml",
    concern: "Combos",
    price: 869,
    reviews: 69,
    href: "/products/harshringar-leaf-juice-1000-ml-joint-pain-care-juice-1000-ml",
    image: cdn("/cdn/shop/files/Harshringar_JointPain.jpg?v=1684142405")
  },
  {
    id: "combo-fat-lauki-amla",
    name: "Fat Reducer Juice 1000 ml | Lauki Amla 500 ml- Weight Management Combo",
    concern: "Combos",
    price: 654,
    reviews: 62,
    href: "/products/fat-reducer-lauki-amla",
    image: cdn("/cdn/shop/files/fat_laukiamla.jpg?v=1698663933")
  },
  {
    id: "combo-cholesterol-cardiac",
    name: "Cholesterol Care Juice 1000 ml | Cardiac Care Juice 1000 ml",
    concern: "Combos",
    price: 1010,
    reviews: 58,
    href: "/products/cholesterol-care-juice-1000-ml-cardiac-care-juice-1000-ml",
    image: cdn("/cdn/shop/files/Cholesterol_Cardic.jpg?v=1684144379")
  },
  {
    id: "combo-soap-haldi-neem-herbal-lime",
    name: "Natural Handmade Soaps Combo -Haldi Chandan | Neem | Herbal | Lime Leaf Soap",
    concern: "Cosmetics",
    price: 214,
    reviews: 47,
    href: "/products/herbal-haidi-chandan-neem-handmade-lime-leaf-soap",
    image: cdn("/cdn/shop/files/2_c3374f6f-a4bc-4c45-97a3-b71cf053c997.png?v=1774349542")
  },
  {
    id: "combo-liver-bhumi-amla",
    name: "Liver Relive Juice 1000 ml | Bhumi Amla Juice 1000 ml",
    concern: "Combos",
    price: 991,
    reviews: 54,
    href: "/products/liver-relive-juice-1000-ml-bhumi-amla-juice-1000-ml",
    image: cdn("/cdn/shop/files/liver_Bhumi.jpg?v=1684141387")
  },
  {
    id: "combo-diabic-aloe",
    name: "Diabic Health Combo- Aloe Vera Juice 1000 ml | Diabic Care Juice 1000 ml",
    concern: "Combos",
    price: 663,
    reviews: 71,
    href: "/products/aloe-vera-juice-diabic-care-juice",
    image: cdn("/cdn/shop/files/aloe_n_diabic_copy.jpg?v=1775639235")
  },
  {
    id: "combo-diabic-bp",
    name: "Diabic Care Juice 1000 ml | BP Care Juice 1000 ml",
    concern: "Combos",
    price: 897,
    reviews: 66,
    href: "/products/diabic-care-juice-1000-ml-bp-care-juice-1000-ml",
    image: cdn("/cdn/shop/files/Diabic_BP_copy.jpg?v=1776669167")
  },
  {
    id: "combo-fat-diabic",
    name: "Fat Reducer Juice 1000 ml | Diabic Care Juice 1000 ml",
    concern: "Combos",
    price: 907,
    reviews: 59,
    href: "/products/fat-reducer-juice-1000-ml-diabic-care-juice-1000-ml",
    image: cdn("/cdn/shop/files/Fat_n_DIabic.jpg?v=1776667913")
  },
  {
    id: "combo-soap-kesar-neem-lime",
    name: "Natural Handmade Soaps Combo -Kesar | Neem | Lime Leaf | Ayurvedic Soap",
    concern: "Cosmetics",
    price: 262,
    reviews: 52,
    href: "/products/kesar-soap-ayurvedic-neem-handmade-lime-leaf-soap",
    image: cdn("/cdn/shop/files/5_946fd7bc-2b17-447e-9db4-4d908d5c5894.png?v=1774350079")
  },
  {
    id: "combo-aloe-amla",
    name: "Aloe Vera Juice 1000ml | Amla Juice 1000ml",
    concern: "Combos",
    price: 419,
    reviews: 84,
    href: "/products/aloe-vera-juice-1000ml",
    image: cdn("/cdn/shop/products/AloeAmla.jpg?v=1667282085")
  },
  {
    id: "combo-jeevan-diabic",
    name: "Jeevan Sanjeevani Kwath 1000 ml | Diabic Care Juice 1000 ml",
    concern: "Combos",
    price: 907,
    reviews: 61,
    href: "/products/jeevan-sanjeevani-kwath-1000-ml-diabic-care-juice-1000-ml",
    image: cdn("/cdn/shop/files/Jeevan_Diabic.jpg?v=1684142145")
  },
  {
    id: "combo-acidity-bael",
    name: "Acidity Care Juice 1000 ml | Bael Juice 1000 ml",
    concern: "Combos",
    price: 869,
    reviews: 73,
    href: "/products/acidity-care-juice-1000-ml-bael-juice-1000-ml",
    image: cdn("/cdn/shop/files/Acidity_Bael.jpg?v=1683716540")
  },
  {
    id: "combo-soap-haldi-kesar",
    name: "Natural Handmade Soaps Combo -Haldi Chandan | Kesar | Ayurvedic Soap | Herbal Soap",
    concern: "Cosmetics",
    price: 248,
    reviews: 39,
    href: "/products/haldi-chandan-kesar-ayurvedic-herbal-soap",
    image: cdn("/cdn/shop/files/1_392095c7-ec7b-48e5-9340-f3248010d6c0.png?v=1774349417")
  },
  {
    id: "combo-kidney-patharchatadi",
    name: "Kidney Relive Juice 1000 ml | Patharchatadi Swaras 1000 ml",
    concern: "Combos",
    price: 1010,
    reviews: 57,
    href: "/products/kidney-relive-juice-1000-ml-patharchatadi-swaras-1000-ml",
    image: cdn("/cdn/shop/files/Kidney_Pathar_e507bd9c-3e20-4a92-8fa0-9dcb00c8ec38.jpg?v=1747223022")
  },
  {
    id: "combo-soap-kesar-haldi-lime",
    name: "Natural Handmade Soaps Combo- Kesar | Haldi Chandan | Lime Leaf | Ayurvedic Soap",
    concern: "Cosmetics",
    price: 262,
    reviews: 41,
    href: "/products/kesar-soap-ayurvedic-haldi-chandan-lime-leaf-soap",
    image: cdn("/cdn/shop/files/Kesar_Haldi_Ayur_Lime.png?v=1774350334")
  },
  {
    id: "combo-jeevan-chyawanprash",
    name: "Jeevan Sanjeevani Kwath 1000 ml | Chyawanprash Preservative Free -500 g",
    concern: "Combos",
    price: 907,
    reviews: 44,
    href: "/products/jeevan-sanjeevani-chyawanprash",
    image: cdn("/cdn/shop/files/Jeevanchywan_659dd7dc-29e4-42c0-8a5c-3776a5cc8e5c.jpg?v=1697886787")
  },
  {
    id: "combo-amla-triphala",
    name: "Amla Juice 1000ml | Triphala Juice 1000ml - Digestive Wellness",
    concern: "Combos",
    price: 466,
    reviews: 33,
    href: "/products/amla-juice-1000ml-triphala-juice-1000ml-digestive-wellness",
    image: cdn("/cdn/shop/products/AmlaTriphala.jpg?v=1667282381")
  },
  {
    id: "combo-immunity-jeevan-amla",
    name: "Immunity Combo- Jeevan Sanjeevani Kwath 1000 ml & Amla Juice 1000 ml",
    concern: "Combos",
    price: 663,
    reviews: 48,
    href: "/products/jeevan-sanjeevani-kwath-amla-juice-the-immunity-combo-pack",
    image: cdn("/cdn/shop/products/JeevanAmla.jpg?v=1667282592")
  },
  {
    id: "combo-soap-haldi-neem-ayurvedic",
    name: "Natural Handmade Soaps Combo -Haldi Chandan| Neem | Herbal | Ayurvedic Soap",
    concern: "Cosmetics",
    price: 292,
    reviews: 36,
    href: "/products/neem-haldi-chandan-ayurvedic-herbal-soap",
    image: cdn("/cdn/shop/files/3_1560b982-eb2a-4d51-b251-06fb2f1ecbe2.png?v=1774349696")
  }
];

export const offerProducts: Product[] = [
  {
    id: "offer-diabic-care-juice",
    name: "Diabic Care Juice",
    concern: "Juices",
    price: 457,
    mrp: 459,
    reviews: 8335,
    href: "/products/diabic-care-juice-regulates-diabetes-1",
    image: cdn("/cdn/shop/files/2_8097f48d-7357-4843-a118-94ef19558620.jpg?v=1753249574")
  },
  {
    id: "offer-cholesterol-care-juice",
    name: "Cholesterol Care Juice",
    concern: "Juices",
    price: 560,
    mrp: 562,
    reviews: 6398,
    href: "/products/cholesterol-care-juice-promote-heart-health",
    image: cdn("/cdn/shop/files/CholesterolCare_2.jpg?v=1748606415")
  },
  {
    id: "offer-fat-reducer-juice",
    name: "Fat Reducer Juice",
    concern: "Juices",
    price: 476,
    mrp: 478,
    reviews: 5139,
    href: "/products/fat-reducer-juice-natural-way-to-lose-weight",
    image: cdn("/cdn/shop/files/FatReducer_1.jpg?v=1748606529")
  },
  {
    id: "offer-patharchatadi-swaras",
    name: "Patharchatadi Swaras",
    concern: "Juices",
    price: 476,
    mrp: 478,
    reviews: 2141,
    href: "/products/patharchatadi-swaras-1000-ml-best-for-kidney-stones",
    image: cdn("/cdn/shop/files/Patharchatadi_1.jpg?v=1748606923")
  },
  {
    id: "offer-thyro-balance-juice",
    name: "Thyro Balance Juice",
    concern: "Juices",
    price: 513,
    mrp: 515,
    reviews: 5349,
    href: "/products/thyro-balance-juice",
    image: cdn("/cdn/shop/files/ThyroBalance_1.jpg?v=1748607195")
  },
  {
    id: "offer-chyawanprash",
    name: "Chyawanprash Preservative Free",
    concern: "Herbal Powders/Churna",
    price: 457,
    mrp: 459,
    reviews: 1268,
    href: "/products/chyawanprash-preservative-free",
    image: cdn("/cdn/shop/files/Chyawanprash_Preservative_Free.jpg?v=1764141901")
  },
  {
    id: "offer-liver-relive-juice",
    name: "Liver Re-Live Juice",
    concern: "Juices",
    price: 541,
    mrp: 543,
    reviews: 3029,
    href: "/products/liver-re-live-juice",
    image: cdn("/cdn/shop/files/LiverRelive_1.jpg?v=1748606802")
  },
  {
    id: "offer-sciatifix-juice",
    name: "Sciatifix Juice",
    concern: "Juices",
    price: 476,
    mrp: 478,
    reviews: 1988,
    href: "/products/sciatifix-juice",
    image: cdn("/cdn/shop/files/Sciatifix_1.jpg?v=1748606997")
  },
  {
    id: "offer-joint-pain-care-juice",
    name: "Joint Pain Care Juice",
    concern: "Juices",
    price: 476,
    mrp: 478,
    reviews: 4018,
    href: "/products/joint-pain-care-juice",
    image: cdn("/cdn/shop/files/JointPainCare_1.jpg?v=1748606725")
  },
  {
    id: "offer-skin-pimple-care-juice",
    name: "Skin & Pimple Care Juice",
    concern: "Juices",
    price: 476,
    mrp: 478,
    reviews: 2873,
    href: "/products/skin-pimple-care-juice",
    image: cdn("/cdn/shop/files/SkinPimple_1.jpg?v=1748607090")
  },
  {
    id: "offer-shilajit-resin",
    name: "Himalayan Shilajit Resin",
    concern: "Herbal Powders/Churna",
    price: 1031,
    mrp: 1033,
    reviews: 975,
    href: "/products/himalayan-shilajit-resin",
    image: cdn("/cdn/shop/files/Shilajit.jpg?v=1766396918")
  },
  {
    id: "offer-bp-care-juice",
    name: "BP Care Juice",
    concern: "Juices",
    price: 466,
    mrp: 468,
    reviews: 2884,
    href: "/products/bp-care-juice",
    image: cdn("/cdn/shop/files/BPCare_1.jpg?v=1748606345")
  },
  {
    id: "offer-naurcissus-juice",
    name: "Naurcissus Juice for Fatigue",
    concern: "Juices",
    price: 579,
    mrp: 581,
    reviews: 692,
    href: "/products/naurcissus-juice-for-fatigue",
    image: cdn("/cdn/shop/files/Naurcissus_1.jpg?v=1748606868")
  },
  {
    id: "offer-cardiac-care-juice",
    name: "Cardiac Care Juice",
    concern: "Juices",
    price: 476,
    mrp: 478,
    reviews: 2554,
    href: "/products/cardiac-care-juice",
    image: cdn("/cdn/shop/files/CardiacCare_1.jpg?v=1748606375")
  },
  {
    id: "offer-hair-scalp-care-juice",
    name: "Hair And Scalp Care Juice",
    concern: "Juices",
    price: 485,
    mrp: 487,
    reviews: 1634,
    href: "/products/hair-and-scalp-care-juice",
    image: cdn("/cdn/shop/files/HairScalp_1.jpg?v=1748606598")
  },
  {
    id: "offer-swarnaprashan",
    name: "Swarnaprashan",
    concern: "Herbal Powders/Churna",
    price: 1453,
    mrp: 1455,
    reviews: 421,
    href: "/products/swarnaprashan",
    image: cdn("/cdn/shop/files/Swarnaprashan.jpg?v=1766143562")
  },
  {
    id: "offer-kidney-relive-juice",
    name: "Kidney Relive Juice",
    concern: "Juices",
    price: 560,
    mrp: 562,
    reviews: 2479,
    href: "/products/kidney-relive-juice",
    image: cdn("/cdn/shop/files/KidneyRelive_1.jpg?v=1748606750")
  },
  {
    id: "offer-piles-care-juice",
    name: "Piles Care Juice",
    concern: "Juices",
    price: 543,
    mrp: 545,
    reviews: 1772,
    href: "/products/piles-care-juice",
    image: cdn("/cdn/shop/files/PilesCare_1.jpg?v=1748606956")
  },
  {
    id: "offer-diabic-care-tablet",
    name: "Diabic Care Tablet",
    concern: "Herbal Powders/Churna",
    price: 448,
    mrp: 450,
    reviews: 1321,
    href: "/products/diabic-care-tablet",
    image: cdn("/cdn/shop/files/DiabicTablet.jpg?v=1766142812")
  },
  {
    id: "offer-jeevan-sanjeevani-kwath",
    name: "Jeevan Sanjeevani Kwath",
    concern: "Juices",
    price: 476,
    mrp: 478,
    reviews: 2365,
    href: "/products/jeevan-sanjeevani-kwath",
    image: cdn("/cdn/shop/files/JeevanSanjeevani_1.jpg?v=1748606670")
  }
];

export const categoryTiles = [
  { label: "Immunity Wellness", icon: ShieldCheck },
  { label: "Digestive Wellness", icon: Leaf },
  { label: "Pain Reliever", icon: Flame },
  { label: "Cardiac Wellness", icon: HeartPulse },
  { label: "Brain Wellness", icon: Brain },
  { label: "Eye Wellness", icon: Eye }
];

export const trustBadges = [
  {
    label: "Natural Herbs",
    icon: Leaf
  },
  {
    label: "GMP Certified",
    icon: ShieldCheck
  },
  {
    label: "No Added Sugar",
    icon: Sparkles
  },
  {
    label: "BPA Free",
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
    description: "Browse the complete ayurvedic collection."
  },
  {
    slug: "combos",
    title: "Combos",
    description: "Curated product combinations inspired by the reference store.",
    productConcerns: ["Combos"]
  },
  {
    slug: "offers",
    title: "Offers",
    description: "Current offer-style collection page. Promotional logic can be connected later.",
    productIds: ["acidant-juice", "aloe-wheatgrass-combo", "aloevera-amla-juice", "amla-aloe-wheatgrass-haldi-tulsi", "ajmodadi-churna", "aloevera-shampoo"]
  },
  {
    slug: "juices",
    title: "Juices",
    description: "Ayurvedic juices and wellness drink products.",
    productConcerns: ["Juices"]
  },
  {
    slug: "herbal-powders-churna",
    title: "Churna",
    description: "Traditional herbal powder and churna products.",
    productConcerns: ["Herbal Powders/Churna"]
  },
  {
    slug: "herbal-powders",
    title: "Powder",
    description: "Powder-based herbal wellness products.",
    productConcerns: ["Herbal Powders/Churna"]
  },
  {
    slug: "skin-care",
    title: "Skin Care",
    description: "Skin-focused wellness and cosmetic products.",
    productConcerns: ["Cosmetics"]
  },
  {
    slug: "hair-care",
    title: "Hair Care",
    description: "Hair-focused ayurvedic products.",
    productIds: ["aloevera-shampoo", "aloevera-gel", "aloe-saffron-gel"]
  },
  {
    slug: "exclusive",
    title: "Exclusive",
    description: "Highlighted products and featured selections.",
    productIds: ["acidant-juice", "acidity-care-juice", "aloe-wheatgrass-combo", "amla-karela-jamun-combo"]
  }
];

export function getCollectionPageConfig(slug: string) {
  return collectionPageConfigs.find((item) => item.slug === slug);
}

export function getCollectionProductsBySlug(slug: string) {
  const config = getCollectionPageConfig(slug);

  if (!config) return [];
  if (slug === "all-products") return collectionProducts;

  return collectionProducts.filter((product) => {
    if (config.productIds?.includes(product.id)) return true;
    if (config.productConcerns?.includes(product.concern)) return true;
    return false;
  });
}

export const siteBrand = {
  name: "Sanjay Pansari Assandh",
  subtitle: "Assandh",
  logo: "/images/client/logo.png"
};

export const siteContact = {
  phone: "+91 83970 80000",
  whatsapp: "+91 87085 34358",
  whatsappUrl: "https://wa.me/918708534358",
  email: "care@krishnaayurved.com",
  address: "Assandh, Haryana",
  addressLine2: "View location on Google Maps",
  mapUrl: "https://maps.app.goo.gl/Goe6v5ocFzAEB6x47?g_st=ic",
  businessName: "Sanjay Pansari Assandh",
  hours: "9:00 AM - 7:00 PM Mon. to Sat."
};

export const siteSocials = [
  { label: "Facebook", href: "https://www.facebook.com/share/1HjyCWVoB7/?mibextid=wwXIfr" },
  { label: "Instagram", href: "https://www.instagram.com/sanjay_pansari_assandh?igsh=djliamxyNHJ5cnlw" }
] as const;

export const siteDescription =
  "Special treatment for erectile dysfunction, sugar, joint pain, paralysis, and gall bladder stone.";
