import { getSupabaseServerClient } from "@/lib/supabase/server";
import { UserPlus, ShieldCheck, Mail, Calendar } from "lucide-react";

export default async function AdminUsersPage() {
  const supabase = await getSupabaseServerClient();
  
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    return <div className="text-red-500">Error loading users: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#242424]">User Management</h1>
          <p className="text-sm text-[#5d6258]">Manage roles and view customer accounts.</p>
        </div>
        <button className="focus-ring inline-flex items-center gap-2 rounded-md bg-[#305724] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
          <UserPlus size={18} />
          Invite User
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-[#e1e3e1] bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f3f6ef] text-xs font-bold uppercase tracking-wider text-[#305724]">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1e3e1]">
            {profiles?.map((profile) => (
              <tr key={profile.id} className="hover:bg-[#fbfaf4]">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#d1e1cd] text-xs font-bold text-[#305724]">
                      {profile.full_name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <div className="font-semibold text-[#242424]">{profile.full_name || "Unnamed User"}</div>
                      <div className="flex items-center gap-1 text-xs text-[#5d6258]">
                         <Mail size={12} /> {profile.id.substring(0, 8)}...
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    profile.role === 'admin' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-blue-100 text-blue-700'
                  }`}>
                    {profile.role === 'admin' && <ShieldCheck size={12} />}
                    {profile.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#5d6258]">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(profile.updated_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                  <span className="ml-2 text-xs text-[#5d6258]">Active</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm font-semibold text-[#305724] hover:underline">
                    Edit
                  </button>
                  {profile.role !== 'admin' && (
                    <button className="ml-4 text-sm font-semibold text-[#305724] hover:underline">
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
