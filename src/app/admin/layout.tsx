import { getSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await getSupabaseServerClient();
  
  // 1. Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/account/login");

  // 2. Check if user has "admin" role in profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    redirect("/"); // Send non-admins back to the shop
  }

  return (
    <div className="flex min-h-screen bg-[#fbfaf4]">
      {/* Navigation (Sidebar & Mobile Header) */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
