"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MyListButton from "@/app/components/MyListButton";

export default function Hero() {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);

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
      <section className="relative flex h-screen items-center justify-center bg-black">
        <h1 className="animate-pulse text-3xl text-white">
          Loading...
        </h1>
      </section>
    );
  }

  if (!movie) return null;

  return (
    <section className="relative h-screen overflow-hidden bg-black">

      {/* Background */}
      {movie.trailerKey ? (
        <iframe
          key={`${movie.id}-${muted}`}
          className="absolute inset-0 h-full w-full scale-[1.7] pointer-events-none"
          src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&mute=${
            muted ? 1 : 0
          }&controls=0&loop=1&playlist=${
            movie.trailerKey
          }&playsinline=1&rel=0&modestbranding=1&showinfo=0`}
          allow="autoplay; encrypted-media"
        />
      ) : (
 <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          priority
          className="object-cover"
        />
      )}

      {/* Netflix Overlays */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black via-black/90 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-3xl px-8 md:px-16 lg:px-24">

          <span className="inline-block rounded-full bg-red-600 px-4 py-2 text-sm font-bold uppercase tracking-widest shadow-lg">
            🔥 Trending Now
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-white drop-shadow-2xl md:text-7xl">
            {movie.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-gray-200">

            <span className="rounded bg-green-600 px-3 py-1 font-bold">
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
              className="rounded-xl bg-white px-8 py-4 text-lg font-bold text-black transition hover:scale-105"
            >
              ▶ Play
            </Link>

            <Link
              href={`/movie/${movie.id}`}
              className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur transition hover:scale-105 hover:bg-white/20"
            >
              ℹ More Info
            </Link>

            <MyListButton
              movie={{
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
              }}
            />

          </div>
        </div>
      </div>

      {/* Mute Button */}
      {movie.trailerKey && (
        <button
          onClick={() => setMuted(!muted)}
          className="absolute bottom-10 right-10 z-20 rounded-full border border-white/20 bg-black/60 px-5 py-3 text-white backdrop-blur transition hover:bg-black/80"
        >
          {muted ? "🔇 Mute" : "🔊 Sound"}
        </button>
      )}

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}