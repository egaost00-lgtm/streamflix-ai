"use client";

import { useState } from "react";
import { Clapperboard } from "lucide-react";

type Movie = {
  title: string;
  genre: string;
  rating: string;
  runtime: string;
  story: string;
  cast: string[];
  posterPrompt: string;
  posterUrl: string;
  error?: string;
};

export default function AIPage() {
  const [prompt, setPrompt] = useState("");
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);

  const generateMovie = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setMovie(data);
    } catch {
      setMovie({
        title: "",
        genre: "",
        rating: "",
        runtime: "",
        story: "",
        cast: [],
        posterPrompt: "",
        posterUrl: "",
        error: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearMovie = () => {
    setPrompt("");
    setMovie(null);
  };

  const shareMovie = async () => {
    if (!movie) return;

    if (navigator.share) {
      await navigator.share({
        title: movie.title,
        text: `${movie.title}\n\n${movie.story}`,
      });
    } else {
      await navigator.clipboard.writeText(
        `${movie.title}\n\n${movie.story}`
      );
      alert("Movie copied to clipboard!");
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#991b1b_0%,#111827_40%,#000000_100%)] text-white flex items-center justify-center p-8">
      <div className="w-full max-w-5xl rounded-3xl border border-red-500/20 bg-white/10 backdrop-blur-2xl shadow-[0_0_60px_rgba(239,68,68,0.25)] p-10">

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <Clapperboard className="w-12 h-12 text-red-500" />

          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            StreamFlix AI
          </h1>
        </div>

        <p className="text-center text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Generate Hollywood-quality movie ideas with AI
        </p>

        <input
          type="text"
          placeholder="Example: Batman in Ancient India..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full rounded-2xl bg-zinc-900/80 border border-zinc-700 p-5 text-lg outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 transition-all"
        />

        <div className="mt-6 flex justify-center gap-4 flex-wrap">

          <button
            onClick={generateMovie}
            disabled={loading}
            className="rounded-xl bg-red-600 hover:bg-red-700 hover:scale-105 hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] disabled:bg-gray-600 px-8 py-3 font-bold transition-all duration-300"
          >
            {loading ? "🎬 Generating..." : "🎬 Generate Movie"}
          </button>

          <button
            onClick={clearMovie}
            className="rounded-xl bg-gray-700 hover:bg-gray-600 px-8 py-3 font-bold transition"
          >
            🗑 Clear
          </button>

          <button
            onClick={shareMovie}
            className="rounded-xl bg-green-600 hover:bg-green-700 px-8 py-3 font-bold transition"
          >
            📤 Share
          </button>

        </div>

        {movie?.error && (
          <div className="mt-8 rounded-xl bg-red-900/40 border border-red-500 p-5">
            {movie.error}
          </div>
        )}

        {movie && !movie.error && (
          <div className="mt-10 rounded-3xl border border-zinc-700 bg-zinc-900/80 p-8 shadow-2xl transition-all duration-500">
                      <h2 className="text-5xl font-extrabold">
              🎬 {movie.title}
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-yellow-400 px-4 py-2 font-bold text-black">
                ⭐ {movie.rating}
              </span>

              <span className="rounded-full bg-red-600 px-4 py-2 font-bold">
                🎭 {movie.genre}
              </span>

              <span className="rounded-full bg-blue-600 px-4 py-2 font-bold">
                ⏱ {movie.runtime}
              </span>
            </div>

            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="mt-8 w-full rounded-2xl border border-zinc-700 shadow-xl"
            />

            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-3">
                📖 Story
              </h3>

              <p className="leading-8 text-gray-300">
                {movie.story}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-3">
                🎭 Cast
              </h3>

              <ul className="space-y-2">
                {movie.cast?.map((actor, index) => (
                  <li
                    key={index}
                    className="rounded-lg bg-zinc-800 px-4 py-2"
                  >
                    {actor}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-2xl bg-black/40 p-6">
              <h3 className="text-xl font-bold">
                🎨 AI Poster Prompt
              </h3>

              <p className="mt-3 text-gray-300 leading-7">
                {movie.posterPrompt}
              </p>
            </div>

          </div>
        )}

        <p className="mt-10 text-center text-gray-500">
          Built with ❤️ by Akash Rajpoot
        </p>

      </div>
    </main>
  );
}