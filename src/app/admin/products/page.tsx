import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin Products | Sanjay Pansari Assandh",
  description: "Protected admin placeholder for future product management."
};

export default async function AdminProductsPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <main className="bg-[#fbfaf4] px-5 py-12 md:py-16">
      <div className="mx-auto max-w-[760px] rounded-[10px] border border-[#e1e3e1] bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#305724]">Protected Admin</p>
        <h1 className="mt-3 text-3xl font-semibold text-[#242424]">Product management portal</h1>
        <p className="mt-4 text-sm leading-7 text-[#5d6258]">
          This route is now protected by Supabase session middleware. The signed-in user can reach it, and unauthenticated visitors are redirected to login.
        </p>
        <div className="mt-6 rounded-md bg-[#fbfaf4] p-5 text-sm leading-7 text-[#4d5149]">
          <p>
            <strong>Current user:</strong> {user?.email}
          </p>
          <p>
            <strong>Status:</strong> Ready for the next phase where we build add/edit/delete product screens backed by Supabase.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/account" className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md bg-[#305724] px-5 text-sm font-semibold text-white">
            Go to account
          </Link>
          <Link href="/collections/all" className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md border border-[#305724] px-5 text-sm font-semibold text-[#305724]">
            View products
          </Link>
        </div>
      </div>
    </main>
  );
}
