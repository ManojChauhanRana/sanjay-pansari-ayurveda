import { Package, Users, ShoppingCart, Tag } from "lucide-react";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await getSupabaseServerClient();

  // Fetch counts efficiently
  const [
    { count: productCount },
    { count: profileCount },
    { count: categoryCount },
    { count: orderCount }
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true })
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#242424]">Dashboard Overview</h1>
        <p className="text-sm text-[#5d6258]">Welcome back! Here is what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Products" 
          value={productCount || 0} 
          icon={Package} 
          trend="Inventory active" 
          color="text-blue-600" 
          bg="bg-blue-50" 
        />
        <StatCard 
          title="Total Customers" 
          value={profileCount || 0} 
          icon={Users} 
          trend="Registered users" 
          color="text-purple-600" 
          bg="bg-purple-50" 
        />
        <StatCard 
          title="Categories" 
          value={categoryCount || 0} 
          icon={Tag} 
          trend="Product segments" 
          color="text-green-600" 
          bg="bg-green-50" 
        />
        <StatCard 
          title="New Orders" 
          value={orderCount || 0} 
          icon={ShoppingCart} 
          trend="Sales this month" 
          color="text-orange-600" 
          bg="bg-orange-50" 
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-[#e1e3e1] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#242424]">Recent Orders</h2>
          <div className="mt-4 flex h-40 items-center justify-center text-sm text-[#c9c9c9]">
             Order tracking data will appear here as you get sales.
          </div>
        </div>
        <div className="rounded-lg border border-[#e1e3e1] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#242424]">Quick Actions</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <a href="/admin/products/new" className="flex items-center justify-center rounded-lg border border-[#305724] p-4 text-sm font-bold text-[#305724] hover:bg-[#f3f6ef]">
              Add Product
            </a>
            <a href="/admin/categories" className="flex items-center justify-center rounded-lg border border-[#305724] p-4 text-sm font-bold text-[#305724] hover:bg-[#f3f6ef]">
              Manage Categories
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, color, bg }: any) {
  return (
    <div className="rounded-lg border border-[#e1e3e1] bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className={`rounded-md ${bg} p-2 ${color}`}>
          <Icon size={24} />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-[#5d6258]">{title}</p>
        <h3 className="text-2xl font-bold text-[#242424]">{value}</h3>
        <p className="mt-1 text-xs text-[#305724] font-medium">{trend}</p>
      </div>
    </div>
  );
}
