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
      <section className="relative flex h-screen items-center justify-center overflow-hidden bg-[#050505]">
        <div className="absolute h-80 w-80 rounded-full bg-red-600/20 blur-[140px]" />

        <div className="relative text-center">
          <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-red-500" />

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-zinc-500">
            StreamFlix AI
          </p>

          <h1 className="mt-3 text-2xl font-bold text-white">
            Preparing your screening...
          </h1>
        </div>
      </section>
    );
  }

  if (!movie) return null;

  const year = movie.release_date?.split("-")[0];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* =====================================================
          CINEMATIC BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0">

        {movie.trailerKey ? (
          <iframe
            key={`${movie.id}-${muted}`}
            className="absolute inset-0 h-full w-full scale-[1.65] pointer-events-none"
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

        {/* Cinematic darkness */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Left readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />

        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />

      </div>

      {/* =====================================================
          AMBIENT LIGHT
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-[15%] top-[20%] h-72 w-72 rounded-full bg-red-600/10 blur-[130px]" />

        <div className="absolute right-[15%] top-[25%] h-96 w-96 rounded-full bg-purple-600/10 blur-[160px]" />

      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] items-center px-6 pb-24 pt-28 md:px-10 lg:px-16">

        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">

          {/* =================================================
              LEFT — MOVIE INFORMATION
          ================================================= */}

          <div className="max-w-3xl">

            {/* AI LABEL */}

            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-black/50 px-5 py-2.5 shadow-[0_0_30px_rgba(239,68,68,0.12)] backdrop-blur-xl">

              <span className="flex h-2 w-2 animate-pulse rounded-full bg-red-500" />

              <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-300">
                StreamFlix AI Original
              </span>

            </div>

            {/* SMALL EYEBROW */}

            <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">

              <span className="h-px w-10 bg-red-500" />

              Featured Screening

            </div>

            {/* TITLE */}

            <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.04em] text-white drop-shadow-2xl sm:text-6xl md:text-7xl lg:text-[6.2rem]">

              {movie.title}

            </h1>

            {/* META */}

            <div className="mt-7 flex flex-wrap items-center gap-3">

              <span className="rounded-md bg-green-500 px-3 py-1.5 text-sm font-black text-black shadow-lg shadow-green-500/20">
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>

              {year && (
                <span className="rounded-md border border-white/20 bg-black/40 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur">
                  {year}
                </span>
              )}

              <span className="rounded-md border border-white/20 bg-black/40 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur">
                HD
              </span>

              <span className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-sm font-semibold text-red-300">
                Trending
              </span>

            </div>

            {/* DESCRIPTION */}

            <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 drop-shadow-md sm:text-lg">
              {movie.overview}
            </p>

            {/* ACTIONS */}

            <div className="mt-9 flex flex-wrap items-center gap-3">

              <Link
                href={`/movie/${movie.id}`}
                className="group flex items-center gap-3 rounded-xl bg-white px-7 py-3.5 text-base font-black text-black shadow-2xl transition duration-300 hover:-translate-y-1 hover:bg-zinc-200"
              >
                <span className="text-lg transition group-hover:scale-110">
                  ▶
                </span>

                Watch Now
              </Link>

              <Link
                href={`/movie/${movie.id}`}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/40 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
              >
                <span>＋</span>
                More Info
              </Link>

              <MyListButton
                movie={{
                  id: movie.id,
                  title: movie.title,
                  poster_path: movie.poster_path,
                }}
              />

            </div>

            {/* AI NOTE */}

            <div className="mt-10 flex items-center gap-4 text-xs text-zinc-500">

              <div className="h-px w-16 bg-white/10" />

              <span>
                Selected by the StreamFlix AI cinematic engine
              </span>

            </div>

          </div>

          {/* =================================================
              RIGHT — CINEMATIC PAPER / MOVIE DOSSIER
          ================================================= */}

          <div className="relative hidden h-[620px] items-center justify-center lg:flex">

            {/* BACK PAPER */}

            <div className="absolute h-[500px] w-[370px] translate-x-10 rotate-[8deg] rounded-[2px] border border-white/10 bg-[#e9e4d9]/10 shadow-2xl backdrop-blur-sm" />

            {/* SECOND PAPER */}

            <div className="absolute h-[525px] w-[390px] -translate-x-4 -rotate-[5deg] rounded-[2px] border border-white/10 bg-[#f4efe5]/10 shadow-2xl backdrop-blur-sm" />

            {/* MAIN PAPER */}

            <div className="group relative h-[555px] w-[410px] rotate-[2deg] overflow-hidden rounded-[3px] border border-white/20 bg-[#f1eee7] text-black shadow-[0_40px_100px_rgba(0,0,0,0.7)] transition duration-700 hover:rotate-0 hover:scale-[1.025]">

              {/* Paper texture */}

              <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(0,0,0,0.12)_0.7px,transparent_0.7px)] [background-size:5px_5px]" />

              {/* Poster */}

              <div className="relative mx-5 mt-5 h-[365px] overflow-hidden bg-zinc-900 shadow-xl">

                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-zinc-900 text-zinc-500">
                    No poster
                  </div>
                )}

                {/* Poster darkening */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Stamp */}

                <div className="absolute left-4 top-4 rotate-[-8deg] rounded-full border-2 border-red-500/80 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-red-400">
                  STREAMFLIX
                </div>

                {/* Poster number */}

                <div className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
                  FEATURED / {year || "2026"}
                </div>

              </div>

              {/* Paper content */}

              <div className="relative px-6 pb-6 pt-5">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-500">
                      Tonight's Screening
                    </p>

                    <h2 className="mt-2 line-clamp-2 text-3xl font-black leading-none tracking-tight">
                      {movie.title}
                    </h2>

                  </div>

                  <div className="rounded-full border-2 border-black/10 px-3 py-2 text-xs font-black">
                    {movie.vote_average?.toFixed(1)}
                  </div>

                </div>

                <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">

                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                      Status
                    </p>

                    <p className="mt-1 text-xs font-black uppercase">
                      Now Streaming
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                      Edition
                    </p>

                    <p className="mt-1 text-xs font-black uppercase">
                      AI Cinema
                    </p>
                  </div>

                </div>

              </div>

              {/* Paper corner */}

              <div className="absolute bottom-0 right-0 h-12 w-12 bg-gradient-to-tl from-black/10 to-transparent" />

            </div>

            {/* Floating AI badge */}

            <div className="absolute bottom-8 right-2 rounded-2xl border border-white/15 bg-black/70 px-5 py-4 shadow-2xl backdrop-blur-2xl">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-purple-600 text-sm">
                  ✦
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                    Powered by
                  </p>

                  <p className="text-sm font-bold text-white">
                    StreamFlix AI
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          FILM REEL / BOTTOM INDICATOR
      ===================================================== */}

      <div className="absolute bottom-7 left-6 right-6 z-20 flex items-center justify-between md:left-10 md:right-10">

        <div className="flex items-center gap-2">

          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600">
            Featured
          </span>

          <div className="h-px w-20 bg-white/10" />

          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600">
            01
          </span>

        </div>

        {/* MUTE */}

        {movie.trailerKey && (
          <button
            onClick={() => setMuted(!muted)}
            className="group flex items-center gap-3 rounded-full border border-white/15 bg-black/50 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-xl transition hover:border-white/30 hover:bg-white/10"
          >
            <span className="text-base">
              {muted ? "🔇" : "🔊"}
            </span>

            <span className="hidden sm:inline">
              {muted ? "Sound Off" : "Sound On"}
            </span>
          </button>
        )}

      </div>

      {/* Bottom black transition */}

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#050505] to-transparent" />

    </section>
  );
}