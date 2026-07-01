"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Package, Users, LogOut, Menu, X } from "lucide-react";

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/combos", icon: Package, label: "Combos" },
    { href: "/admin/categories", icon: LayoutDashboard, label: "Categories" },
    { href: "/admin/users", icon: Users, label: "User Management" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="flex h-16 items-center justify-between border-b border-[#e1e3e1] bg-white px-6 lg:hidden">
        <div className="flex items-center gap-2">
          <img src="/images/client/logo.png" alt="Logo" className="h-6 w-6 object-contain" />
          <span className="text-sm font-bold uppercase tracking-tight text-[#305724]">Sanjay Pansari</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="rounded-md p-1.5 text-[#5d6258] hover:bg-[#f3f6ef] hover:text-[#305724] focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar - Desktop and Mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-[#e1e3e1] bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:block"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-[#e1e3e1] px-6">
          <div className="flex items-center gap-3">
            <img src="/images/client/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
            <span className="text-sm font-bold uppercase tracking-tight text-[#305724]">Sanjay Pansari</span>
          </div>
          <button
            onClick={closeSidebar}
            className="rounded-md p-1 text-[#5d6258] hover:bg-[#f3f6ef] hover:text-[#305724] lg:hidden"
            aria-label="Close Menu"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="mt-6 space-y-1 px-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeSidebar}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#eef5ea] text-[#305724] font-bold"
                    : "text-[#5d6258] hover:bg-[#f3f6ef] hover:text-[#305724]"
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
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

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
}
