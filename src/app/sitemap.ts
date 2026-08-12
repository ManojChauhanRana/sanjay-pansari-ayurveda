import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { collectionPageConfigs } from "@/lib/site-data";

const BASE_URL = "https://sanjay-pansari-ayurveda.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/pages/consult-by-vaidya`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pages/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pages/rewards`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Add static collections
  collectionPageConfigs.forEach((config) => {
    routes.push({
      url: `${BASE_URL}/collections/${config.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  // Fetch and add dynamic products from Supabase
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (url && key) {
      const supabase = createClient(url, key);
      const { data: products } = await supabase
        .from("products")
        .select("slug, updated_at")
        .limit(1000);

      if (products) {
        products.forEach((product) => {
          if (product.slug) {
            routes.push({
              url: `${BASE_URL}/products/${product.slug}`,
              lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
              changeFrequency: "weekly",
              priority: 0.7,
            });
          }
        });
      }
    }
  } catch (error) {
    console.error("Error generating sitemap products:", error);
  }

  return routes;
}
