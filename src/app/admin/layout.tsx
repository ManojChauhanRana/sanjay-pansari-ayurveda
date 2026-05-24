import Link from "next/link";
import { LayoutDashboard, Package, Users, LogOut } from "lucide-react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-[#e1e3e1] bg-white lg:block">
        <div className="flex h-16 items-center gap-3 border-b border-[#e1e3e1] px-6">
          <img src="/images/client/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
          <span className="text-sm font-bold uppercase tracking-tight text-[#305724]">Sanjay Pansari</span>
        </div>
        <nav className="mt-6 space-y-1 px-4">
          <AdminNavLink href="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <AdminNavLink href="/admin/products" icon={Package} label="Products" />
          <AdminNavLink href="/admin/combos" icon={Package} label="Combos" />
          <AdminNavLink href="/admin/categories" icon={LayoutDashboard} label="Categories" />
          <AdminNavLink href="/admin/users" icon={Users} label="User Management" />
        </nav>
        <div className="absolute bottom-0 w-full border-t border-[#e1e3e1] p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[#5d6258] hover:bg-[#f3f6ef] hover:text-[#305724]"
          >
            <LogOut size={18} />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <header className="flex h-16 items-center justify-between border-b border-[#e1e3e1] bg-white px-8 lg:hidden">
           <div className="flex items-center gap-2">
             <img src="/images/client/logo.png" alt="Logo" className="h-6 w-6 object-contain" />
             <span className="text-sm font-bold uppercase text-[#305724]">Sanjay Pansari</span>
           </div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function AdminNavLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[#5d6258] transition-colors hover:bg-[#f3f6ef] hover:text-[#305724]"
    >
      <Icon size={18} />
      {label}
    </Link>
  );
}
