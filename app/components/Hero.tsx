"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  async function loadHero() {
    try {
      const res = await fetch("/api/tmdb/hero");
      const data = await res.json();
      setMovie(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  loadHero();

  const interval = setInterval(loadHero, 20000);

  return () => clearInterval(interval);
}, []);

  if (loading) {
    return (
      <section className="relative h-screen bg-black flex items-center justify-center">
        <h1 className="text-white text-3xl animate-pulse">
          Loading...
        </h1>
      </section>
    );
  }

  if (!movie) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background */}
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        fill
        priority
        className="object-cover object-center"
      />

      {/* Netflix Style Overlays */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-black via-black/80 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-3xl px-8 md:px-16 lg:px-24">

          <span className="inline-block rounded-full bg-red-600 px-4 py-1 text-sm font-semibold uppercase tracking-widest">
            Trending Now
          </span>

          <h1 className="mt-6 text-5xl md:text-7xl font-extrabold leading-tight text-white drop-shadow-lg">
            {movie.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-gray-200">
            <span className="rounded bg-green-600 px-3 py-1 font-semibold">
              ⭐ {movie.vote_average?.toFixed(1)}
            </span>

            <span>{movie.release_date?.split("-")[0]}</span>

            <span className="rounded border border-white/30 px-2 py-1">
              HD
            </span>

            <span>Trending</span>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300 line-clamp-4">
            {movie.overview}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href={`/movie/${movie.id}`}
              className="rounded-lg bg-white px-8 py-4 text-lg font-bold text-black transition hover:scale-105"
            >
              ▶ Play
            </Link>

            <button className="rounded-lg border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur hover:bg-white/20">
              ℹ More Info
            </button>

            <button className="rounded-lg bg-red-600 px-8 py-4 text-lg font-semibold text-white hover:bg-red-700">
              ❤️ My List
            </button>

          </div>        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}