"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [search, setSearch] = useState(query);
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSearch(query);
  }, [query]);

  useEffect(() => {
    async function searchMovies() {
      if (!query) {
        setMovies([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(
          `/api/tmdb/search?query=${encodeURIComponent(query)}`
        );

        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    searchMovies();
  }, [query]);

  function handleSearch() {
    if (!search.trim()) return;

    router.push(`/search?q=${encodeURIComponent(search.trim())}`);
  }

  return (
    <main className="min-h-screen bg-black px-6 md:px-10 lg:px-16 pt-28 pb-12 text-white">

      {/* Header */}
      <div className="mx-auto mb-12 max-w-5xl">

        <button
          onClick={() => router.back()}
          className="mb-6 rounded-lg bg-zinc-800 px-5 py-3 font-semibold transition hover:bg-zinc-700"
        >
          ← Back
        </button>

        <h1 className="mb-3 text-center text-5xl font-extrabold">
          🔍 Search Movies
        </h1>

        <p className="mb-8 text-center text-gray-400">
          Find your favourite movies instantly
        </p>

        <div className="mx-auto flex max-w-3xl flex-col gap-4 md:flex-row">

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Search movies..."
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-4 text-lg text-white outline-none transition focus:border-red-600"
          />

          <button
            onClick={handleSearch}
            className="rounded-xl bg-red-600 px-8 py-4 font-bold text-white transition hover:bg-red-700 hover:scale-105"
          >
            🔍 Search
          </button>

        </div>

        <p className="mt-8 text-center text-gray-400">
          <span className="text-2xl font-bold text-white">
            {movies.length}
          </span>{" "}
          results found for{" "}
          <span className="font-semibold text-red-500">
            "{query}"
          </span>
        </p>

      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="text-xl animate-pulse">
            Loading movies...
          </div>
        </div>
      ) : movies.length === 0 ? (
        <div className="py-20 text-center text-xl text-gray-400">
          No movies found.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="group"
            >
              <div className="overflow-hidden rounded-2xl bg-zinc-900 transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-red-500/20">

                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="aspect-[2/3] w-full object-cover"
                />

                <div className="space-y-2 p-4">

                  <h2 className="line-clamp-1 text-lg font-bold">
                    {movie.title}
                  </h2>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>
                      {movie.release_date?.slice(0, 4) || "Unknown"}
                    </span>

                    <span className="font-semibold text-yellow-400">
                      ⭐ {movie.vote_average?.toFixed(1)}
                    </span>
                  </div>

                </div>

              </div>
            </Link>
          ))}

        </div>
      )}
    </main>
  );
}