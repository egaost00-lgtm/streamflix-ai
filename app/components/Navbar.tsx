"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { getUser, signOut } from "@/lib/auth";

export default function Navbar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) {
  const [results, setResults] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
const router = useRouter();

useEffect(() => {
  if (!search.trim()) {
    setResults([]);
    return;
  }

  const timer = setTimeout(async () => {
    const res = await fetch(
      `/api/tmdb/search?query=${encodeURIComponent(search)}`
    );

    const data = await res.json();
    setResults(data);
  }, 400);

  return () => clearTimeout(timer);
}, [search]);
useEffect(() => {
  async function loadUser() {
    const {
      data: { user },
    } = await getUser();

    setUser(user);
  }

  loadUser();
}, []);
    
  return (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-4 bg-black/50 backdrop-blur-2xl border-b border-white/10 ">

  {/* Logo */}
  <h1 className="text-red-600 text-4xl font-black tracking-[0.2em]">
    STREAMFLIX AI
  </h1>

  {/* Navigation */}
  <div className="hidden lg:flex items-center gap-8 text-base font-semibold text-white">
    <a href="#" className="hover:text-red-500 transition">
      Home
    </a>

    <a href="#" className="hover:text-red-500 transition">
      Movies
    </a>

    <a href="#" className="hover:text-red-500 transition">
      TV Shows
    </a>

   <Link
  href="/my-list"
  className="hover:text-red-500 transition"
>
  My List
</Link>
  </div>

  {/* Right Side */}
  <div className="flex items-center gap-4">
    <div className="relative">
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="🔍 Search movies..."
    className="hidden lg:block w-56 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-400 backdrop-blur-md focus:border-red-500 focus:outline-none"
  />

  {results.length > 0 && (
  <div className="absolute top-12 left-0 w-full min-w-[320px] bg-black border border-gray-700 rounded-xl shadow-xl overflow-hidden z-50">
    {results.slice(0, 6).map((movie: any) => (
      <Link
        key={movie.id}
        href={`/movie/${movie.id}`}
        onClick={() => {
  setSearch("");
  setResults([]);
}}
        className="flex items-center gap-3 p-3 hover:bg-gray-800 transition"
      >
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
              : "/placeholder.png"
          }
          alt={movie.title}
          className="w-10 h-14 rounded object-cover"
        />

        <div>
          <p className="text-white font-medium">{movie.title}</p>
          <p className="text-gray-400 text-sm">
            {movie.release_date?.slice(0, 4) || "Unknown"}
          </p>
        </div>
      </Link>
    ))}
  </div>
)}
</div>

    <Link
  href="/ai"
  className="rounded-full bg-purple-600 px-5 py-2 font-semibold text-white transition hover:scale-105 hover:bg-purple-700"
>
  🤖 Ask AI
</Link>

    {user ? (
  <button
    onClick={async () => {
      await signOut();
      setUser(null);
      router.refresh();
      router.replace("/");
    }}
    className="rounded-full bg-red-600 px-5 py-2 font-semibold text-white transition hover:scale-105 hover:bg-red-700"
  >
    Logout
  </button>
) : (
  <Link
    href="/login"
    className="rounded-full bg-red-600 px-5 py-2 font-semibold text-white transition hover:scale-105 hover:bg-red-700"
  >
    Sign In
  </Link>
)}
  </div>

</nav>
  );
}