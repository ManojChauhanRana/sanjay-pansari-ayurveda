"use client";

import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fbfaf4] px-6 text-center">
      <div className="relative mb-8">
        <h1 className="text-[120px] font-black leading-none text-[#305724] opacity-10 md:text-[200px]">404</h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <img src="/images/client/logo.png" alt="Logo" className="mb-4 h-16 w-16 object-contain md:h-24 md:w-24" />
          <h2 className="text-2xl font-bold text-[#242424] md:text-3xl">Page Not Found</h2>
        </div>
      </div>
      
      <p className="max-w-md text-[#5d6258] md:text-lg">
        Oops! The page you're looking for doesn't exist or has been moved. 
        Try searching our store or return home.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link 
          href="/" 
          className="flex items-center justify-center gap-2 rounded-full bg-[#305724] px-8 py-3 font-bold text-white transition-transform hover:scale-105 active:scale-95"
        >
          <Home size={18} />
          Back to Home
        </Link>
        <Link 
          href="/collections/all" 
          className="flex items-center justify-center gap-2 rounded-full border-2 border-[#305724] bg-transparent px-8 py-3 font-bold text-[#305724] transition-transform hover:scale-105 active:scale-95"
        >
          <Search size={18} />
          Browse Products
        </Link>
      </div>

      <div className="mt-16 text-sm text-[#c9c9c9]">
        <p>© {new Date().getFullYear()} Sanjay Pansari Ayurveda. All rights reserved.</p>
      </div>
    </div>
  );
}
