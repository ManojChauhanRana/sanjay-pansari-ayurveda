import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCollection } from "@/components/product/product-collection";
import { collectionPageConfigs, getCollectionPageConfig, getCollectionProductsBySlug } from "@/lib/site-data";

type CollectionRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return collectionPageConfigs.map((config) => ({
    slug: config.slug
  }));
}

export async function generateMetadata({ params }: CollectionRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getCollectionPageConfig(slug);

  if (!config) return { title: "Collection not found" };

  return {
    title: `${config.title} | Krishna's Herbal & Ayurveda`,
    description: config.description
  };
}

export default async function CollectionRoute({ params }: CollectionRouteProps) {
  const { slug } = await params;
  const config = getCollectionPageConfig(slug);

  if (!config) notFound();

  const products = getCollectionProductsBySlug(slug);

  return (
    <main className="bg-white">
      <section className="border-b border-[#e1e3e1] bg-[#fbfaf4]">
        <div className="mx-auto max-w-[1040px] px-5 py-10 text-center md:py-14">
          <h1 className="text-[32px] font-semibold leading-tight text-[#242424] md:text-[42px]">{config.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5d6258]">{config.description}</p>
        </div>
      </section>
      <ProductCollection products={products} />
    </main>
  );
}
