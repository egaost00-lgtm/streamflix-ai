"use client";

import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

export default function Navbar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) {
    
  return (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 bg-black/40 backdrop-blur-xl border-b border-white/10 transition-all duration-300">

  {/* Logo */}
  <h1 className="text-red-600 text-3xl font-black tracking-widest cursor-pointer hover:scale-105 transition">
    STREAMFLIX AI
  </h1>

  {/* Navigation */}
  <div className="hidden md:flex gap-10 text-white font-semibold text-lg">
    <a href="#" className="hover:text-red-500 transition">
      Home
    </a>

    <a href="#" className="hover:text-red-500 transition">
      Movies
    </a>

    <a href="#" className="hover:text-red-500 transition">
      TV Shows
    </a>

    <a href="#" className="hover:text-red-500 transition">
      My List
    </a>
  </div>

  {/* Right Side */}
  <div className="flex items-center gap-4">
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="🔍 Search movies..."
      className="hidden md:block bg-white/10 border border-gray-700 rounded-full px-5 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 w-64"
    />

    <Link
  href="/ai"
  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full text-white transition"
>
  🤖 Ask AI
</Link>

    <Link
      href="/login"
      className="bg-red-600 px-5 py-2 rounded-full hover:bg-red-700 transition text-white"
    >
      Sign In
    </Link>
  </div>

</nav>
  );
}