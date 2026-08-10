
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Movie = {
  id: string;
  title: string;
  poster: string;
};

export default function ContinueWatching() {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("continueWatching");

    if (data) {
      setMovie(JSON.parse(data));
    }
  }, []);

  return (
    <section className="px-16 pt-10 pb-16">

      <h2 className="mb-6 text-3xl font-bold text-white">
        ▶ Continue Watching
      </h2>

      {!movie ? (
        <div className="flex h-72 items-center justify-center rounded-3xl border border-white/10 bg-zinc-900">

          <div className="text-center">

            <div className="mb-4 text-5xl">🎬</div>

            <h3 className="text-2xl font-bold">
              Nothing to Continue
            </h3>

            <p className="mt-2 text-gray-400">
              Start watching a movie and it will appear here.
            </p>

          </div>

        </div>
      ) : (

        <Link
          href={`/watch/${movie.id}`}
          className="group block w-56 transition hover:scale-105"
        >

          <div className="overflow-hidden rounded-2xl">

            <Image
              src={movie.poster}
              alt={movie.title}
              width={220}
              height={330}
              className="h-[330px] w-full object-cover transition group-hover:scale-110"
            />

          </div>

          <h3 className="mt-4 text-xl font-bold text-white">
            {movie.title}
          </h3>

          <div className="mt-3 h-2 rounded-full bg-zinc-700">
            <div className="h-2 w-1/2 rounded-full bg-red-600" />
          </div>

          <p className="mt-2 text-sm text-gray-400">
            Resume Watching
          </p>

        </Link>

      )}

    </section>
  );
}