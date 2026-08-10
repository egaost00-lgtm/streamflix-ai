
"use client";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";

export default function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: movieId } = use(params);

  const [saved, setSaved] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [movie, setMovie] = useState<any>(null);

useEffect(() => {
  async function loadMovie() {
   const { data, error } = await supabase
  .from("movies")
  .select("*")
  .eq("id", movieId)
  .single();

console.log("Movie ID:", movieId);
console.log("Movie Data:", data);
console.log("Supabase Error:", error);

setMovie(data);
  }

  loadMovie();
}, [movieId]);

  useEffect(() => {
    const isSaved = localStorage.getItem("watchlist");

    if (isSaved === "true") {
      setSaved(true);
    }
  }, []);

  useEffect(() => {
    const progress = localStorage.getItem("continueWatching");

    if (!progress || !videoRef.current) return;

    const movie = JSON.parse(progress);

    if (movie.id === movieId && movie.currentTime) {
      videoRef.current.currentTime = movie.currentTime;
    }
  }, [movieId]);

  function saveProgress() {
    if (!videoRef.current) return;

    localStorage.setItem(
      "continueWatching",
      JSON.stringify({
        id: movieId,
        title: "Unlimited AI Movies",
        poster:
          "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        currentTime: videoRef.current.currentTime,
        duration: videoRef.current.duration,
      })
    );
  }

  function handleWatchNow() {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }

  function handleWatchlist() {
    setSaved(true);
    localStorage.setItem("watchlist", "true");
  }
  if (!movie) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      Loading...
    </div>
  );
}
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Banner */}
      <section className="relative h-[500px] w-full overflow-hidden">

        <img
          src="https://image.tmdb.org/t/p/original/9l1eZiJHmhr5jIlthMdJN5WYoff.jpg"
          alt="Movie Banner"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute top-8 left-8">
          <Link
            href="/"
            className="rounded-full bg-black/50 px-5 py-3 backdrop-blur-md hover:bg-red-600 transition"
          >
            ← Back
          </Link>
        </div>

        <div className="absolute bottom-14 left-10 max-w-2xl">

          <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold">
            🔥 AI ORIGINAL
          </span>

         <h1 className="mt-5 text-6xl font-extrabold">
  {movie.title}
</h1>

         <p className="mt-5 text-lg text-gray-300 leading-relaxed">
  {movie.description}
</p>

         <div className="mt-6 flex flex-wrap gap-5 text-gray-300">
  <span>⭐ {movie.rating}</span>
  <span>📅 {movie.release_year}</span>
  <span>⏱ {movie.duration || "N/A"} min</span>
  <span>🌍 {movie.language || "N/A"}</span>
  <span>🎭 {movie.genre}</span>
</div>

          <div className="mt-8 flex gap-4">

            <button
              onClick={handleWatchNow}
              className="rounded-full bg-red-600 px-8 py-4 font-semibold hover:bg-red-700 transition"
            >
              ▶ Watch Now
            </button>

            <button
              onClick={handleWatchlist}
              
              className="rounded-full border border-white/20 bg-white/10 px-8 py-4 backdrop-blur-lg hover:bg-white/20 transition"
            >
              {saved ? "✅ In Watchlist" : "❤️ Add Watchlist"}
            </button>

          </div>

        </div>

      </section>

      {/* Video Player */}
      <section className="mx-auto max-w-7xl px-8 py-16">

        <h2 className="mb-6 text-3xl font-bold">
          🎥 Now Playing
        </h2>

        <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">

         
<video
  ref={videoRef}
  controls
  autoPlay
  className="w-full rounded-3xl"
  onLoadedMetadata={() => {
    const progress = localStorage.getItem("continueWatching");

    if (!progress || !videoRef.current) return;

    const movie = JSON.parse(progress);

    if (movie.id === movieId && movie.currentTime) {
      videoRef.current.currentTime = movie.currentTime;
    }
  }}
  onTimeUpdate={() => {
    if (
      videoRef.current &&
      Math.floor(videoRef.current.currentTime) % 5 === 0
    ) {
      saveProgress();
    }
  }}
>
            <source
  src={movie?.video_url || "/videos/demo.mp4"}
  type="video/mp4"
/>
          </video>

        </div>

      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-8">

        <h2 className="text-3xl font-bold">
          About this Movie
        </h2>

        <p className="mt-6 max-w-4xl text-gray-400 leading-8">
          StreamFlix AI showcases next-generation AI-powered storytelling.
          Every scene, dialogue, soundtrack and visual style is designed to
          demonstrate what modern AI entertainment can look like.
        </p>

      </section>

      {/* More Like This */}
      <section className="mx-auto max-w-7xl px-8 py-16">

        <h2 className="mb-8 text-3xl font-bold">
          🍿 More Like This
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 transition hover:scale-105 hover:border-red-500/40"
            >
              <img
                src="https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
                alt={`AI Movie ${item}`}
                className="h-[260px] w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold">
                  AI Movie {item}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  ⭐ 9.{item} • Sci-Fi
                </p>
              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}