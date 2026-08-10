"use client";

import Avatar from "./Avatar";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const [showMenu, setShowMenu] = useState(false);

  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/tmdb/search?query=${encodeURIComponent(search)}`
        );

        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    }, 300);

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

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);
    return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/50 px-8 py-4 backdrop-blur-2xl lg:px-16">
      {/* Logo */}
      <Link
        href="/"
        className="text-4xl font-black tracking-[0.2em] text-red-600"
      >
        STREAMFLIX AI
      </Link>

      {/* Navigation */}
      <div className="hidden items-center gap-8 text-base font-semibold text-white lg:flex">
        <Link href="/" className="transition hover:text-red-500">
          Home
        </Link>

        <Link href="/" className="transition hover:text-red-500">
          Movies
        </Link>

        <Link href="/" className="transition hover:text-red-500">
          TV Shows
        </Link>

        <Link href="/my-list" className="transition hover:text-red-500">
          My List
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="relative group">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && search.trim()) {
                router.push(
                  `/search?q=${encodeURIComponent(search.trim())}`
                );
                setResults([]);
              }
            }}
            placeholder="🔍 Search movies..."
            className="hidden w-64 rounded-full border border-white/10 bg-white/5 px-5 py-3 pl-12 text-white placeholder:text-gray-400 backdrop-blur-xl transition-all duration-300 focus:border-red-500 focus:bg-white/10 focus:ring-2 focus:ring-red-500/40 focus:outline-none md:block"
          />

          {results.length > 0 && (
            <div className="absolute left-0 top-12 z-50 w-full min-w-[320px] overflow-hidden rounded-xl border border-gray-700 bg-black shadow-xl">
              {results.slice(0, 6).map((movie: any) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  onClick={() => {
                    setSearch("");
                    setResults([]);
                  }}
                  className="flex items-center gap-3 p-3 transition hover:bg-gray-800"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                        : "/placeholder.png"
                    }
                    alt={movie.title}
                    className="h-14 w-10 rounded object-cover"
                  />

                  <div>
                    <p className="font-medium text-white">
                      {movie.title}
                    </p>

                    <p className="text-sm text-gray-400">
                      {movie.release_date?.slice(0, 4) || "Unknown"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Ask AI */}
        <Link
          href="/ai"
          className="rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50"
        >
          🤖 Ask AI
        </Link>

        {/* Profile */}
        {user ? (
          <div className="relative" ref={menuRef}>
            <button
  onClick={() => setShowMenu(!showMenu)}
  className="flex items-center gap-2"
>
  <Avatar
    name={user?.email?.split("@")[0] || "Akash Rajput"}
  />

  <svg
    className={`w-4 h-4 text-white transition-transform ${
      showMenu ? "rotate-180" : ""
    }`}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 9l-7 7-7-7"
    />
  </svg>
</button>

            {showMenu && (
              <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-3xl border border-white/10 bg-black/70 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] ring-1 ring-white/5 transition-all duration-300">

                <div className="border-b border-white/10 p-5 text-center">
  <div className="mx-auto mb-3">
    <Avatar
      name={user?.email?.split("@")[0] || "Akash Rajput"}
    />
  </div>

  <h3 className="text-lg font-bold text-white">
    {user?.email?.split("@")[0]}
  </h3>

  <p className="mt-1 text-sm text-gray-400">
    {user?.email}
  </p>

  <span className="mt-3 inline-flex rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-semibold text-yellow-300">
    ⭐ Premium Member
  </span>
</div>
<Link
  href="/profile"
  onClick={() => setShowMenu(false)}
  className="group flex items-center justify-between rounded-xl px-4 py-3 text-white transition-all duration-300 hover:bg-white/10 hover:translate-x-1"
>
  <span className="flex items-center gap-3">
    👤
    <span>Profile</span>
  </span>

  <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    →
  </span>
</Link>
<Link
  href="/my-list"
  className="group flex items-center justify-between rounded-xl px-4 py-3 text-white transition-all duration-300 hover:bg-white/10 hover:translate-x-1"
>
  <span className="flex items-center gap-3">
    ❤️
    <span>My List</span>
  </span>

  <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    →
  </span>
</Link>
<Link
  href="/continue"
  onClick={() => setShowMenu(false)}
  className="group flex items-center justify-between rounded-xl px-4 py-3 text-white transition-all duration-300 hover:bg-white/10 hover:translate-x-1"
>
  <span className="flex items-center gap-3">
    ▶
    <span>Continue Watching</span>
  </span>

  <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    →
  </span>
</Link>         
                <Link
  href="/ai"
  className="group flex items-center justify-between rounded-xl px-4 py-3 text-white transition-all duration-300 hover:bg-white/10 hover:translate-x-1"
>
  <span className="flex items-center gap-3">
    🤖
    <span>Ask AI</span>
  </span>

  <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    →
  </span>
</Link>

               <Link
  href="/search"
  className="group flex items-center justify-between rounded-xl px-4 py-3 text-white transition-all duration-300 hover:bg-white/10 hover:translate-x-1"
>
  <span className="flex items-center gap-3">
    🔍
    <span>Search</span>
  </span>

  <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    →
  </span>
</Link>

                <button
                  onClick={async () => {
                    await signOut();
                    setShowMenu(false);
                    setUser(null);
                    router.replace("/");
                    router.refresh();
                  }}
                  className="group flex w-full items-center justify-between rounded-xl px-4 py-3 text-red-400 transition-all duration-300 hover:bg-red-500/10 hover:text-red-300"
                >
                  <>
  <span className="flex items-center gap-3">
    🚪
    <span>Logout</span>
  </span>

  <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    →
  </span>
</>
                </button>
              </div>
            )}
          </div>
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