"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeroSlider() {
  const [movies, setMovies] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const res = await fetch("/api/tmdb/featured");
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  useEffect(() => {
    if (!movies.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [movies]);

  if (loading) {
    return (
      <section className="flex h-screen items-center justify-center bg-black">
        <h1 className="text-3xl text-white animate-pulse">
          Loading...
        </h1>
      </section>
    );
  }

  const movie = movies[current];

  if (!movie) return null;

  return (
    <section className="relative h-screen overflow-hidden bg-black">

      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 h-60 w-full bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 flex h-full items-center px-8 md:px-16">

        <div className="max-w-2xl">

          <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-bold">
            STREAMFLIX AI ORIGINAL
          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-white md:text-7xl">
            {movie.title}
          </h1>

          <div className="mt-5 flex gap-4 text-white">

            <span className="rounded bg-green-600 px-3 py-1 font-bold">
              ⭐ {movie.vote_average?.toFixed(1)}
            </span>

            <span>
              {movie.release_date?.split("-")[0]}
            </span>

            <span className="rounded border border-white/30 px-2">
              HD
            </span>

          </div>

          <p className="mt-6 text-lg leading-8 text-gray-300 line-clamp-4">
            {movie.overview}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href={`/movie/${movie.id}`}
              className="rounded-xl bg-white px-8 py-4 font-bold text-black transition hover:scale-105"
            >
              ▶ Watch Now
            </Link>

            <Link
              href={`/movie/${movie.id}`}
              className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-white backdrop-blur transition hover:scale-105"
            >
              ℹ More Info
            </Link>

          </div>

        </div>

      </div>

      <button
        onClick={() =>
          setCurrent((current - 1 + movies.length) % movies.length)
        }
        className="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-4 text-3xl text-white"
      >
        ‹
      </button>

      <button
        onClick={() =>
          setCurrent((current + 1) % movies.length)
        }
        className="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-4 text-3xl text-white"
      >
        ›
      </button>

      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full ${
              current === index
                ? "bg-red-600"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>

    </section>
  );
}