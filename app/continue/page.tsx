"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ContinuePage() {
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("continueWatching");

    if (saved) {
      setMovie(JSON.parse(saved));
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white px-8 py-10">

      <div className="flex items-center justify-between mb-10">
        <h1 className="text-5xl font-bold">
          ▶ Continue Watching
        </h1>

        <Link
          href="/"
          className="rounded-xl bg-zinc-900 px-5 py-3 hover:bg-zinc-800 transition"
        >
          ← Home
        </Link>
      </div>

      {!movie ? (
        <div className="flex flex-col items-center justify-center mt-32">

          <div className="text-7xl mb-6">🎬</div>

          <h2 className="text-3xl font-bold">
            Nothing to Continue
          </h2>

          <p className="mt-4 text-gray-400">
            Start watching a movie and it will appear here.
          </p>

        </div>
      ) : (

        <Link
          href={`/watch/${movie.id}`}
          className="group block max-w-xs"
        >
          <div className="overflow-hidden rounded-2xl">

            <Image
              src={movie.poster}
              alt={movie.title}
              width={500}
              height={750}
              className="rounded-2xl transition duration-300 group-hover:scale-105"
            />

          </div>

          <h2 className="mt-4 text-2xl font-bold">
            {movie.title}
          </h2>

          <p className="mt-2 text-red-500">
            ▶ Resume Watching
          </p>

        </Link>

      )}

    </main>
  );
}