"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    fetch("/api/tmdb/hero")
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, []);

  if (!movie) {
    return (
      <section className="relative h-screen bg-black flex items-center justify-center">
        <h1 className="text-white text-3xl">Loading...</h1>
      </section>
    );
  }

  return (
    <section className="relative h-[78vh] overflow-hidden">
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent" />

      <div className="absolute left-16 lg:left-24 top-[55%] -translate-y-1/2 z-20 max-w-3xl">

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none">
          {movie.title}
        </h1>

        <div className="flex items-center gap-6 mt-6 text-lg text-gray-300">
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
          <span>📅 {movie.release_date}</span>
          <span className="text-red-400">🔥 Trending</span>
        </div>

        <p className="mt-6 max-w-xl text-lg text-gray-300 leading-8 line-clamp-4">
          {movie.overview}
        </p>

        <div className="flex gap-4 mt-8">
          <Link
            href={`/movie/${movie.id}`}
            className="rounded-xl bg-white px-8 py-4 text-lg font-bold text-black transition hover:scale-105"
          >
            ▶ Play
          </Link>

          <button className="bg-white/10 border border-white/20 px-5 py-3 rounded-xl">
            ℹ More Info
          </button>

          <button className="bg-red-600 px-5 py-3 rounded-xl">
            ❤️ Add to Watchlist
          </button>
        </div>

      </div>
    </section>
  );
}