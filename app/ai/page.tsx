"use client";

import { useState } from "react";
import { Clapperboard } from "lucide-react";

type Movie = {
  title: string;
  genre: string;
  rating: string;
  runtime: string;
  story: string;
  cast: any[];
posterPrompt: string;
posterUrl: string;

tagline?: string;
director?: string;
year?: string;
trailerPrompt?: string;
  error?: string;
};

export default function AIPage() {
  const [prompt, setPrompt] = useState("");
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [trailer, setTrailer] = useState<any>(null);
const [trailerLoading, setTrailerLoading] = useState(false);

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
  const generateTrailer = async () => {
  if (!movie) return;

  setTrailerLoading(true);

  try {
    const res = await fetch("/api/trailer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: movie.title,
        story: movie.story,
      }),
    });

    const data = await res.json();
    setTrailer(data);
  } catch (error) {
    console.error(error);
    alert("Failed to generate trailer.");
  } finally {
    setTrailerLoading(false);
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
            {loading ? (
  <span className="flex items-center gap-2">
    <span className="animate-spin">🎬</span>
    Creating Blockbuster...
  </span>
) : (
  "🎬 Generate Movie"
)}
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
          <button
  onClick={generateTrailer}
  disabled={!movie || trailerLoading}
  className="rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 px-8 py-3 font-bold transition"
>
  {trailerLoading ? "🎥 Generating..." : "🎥 Generate Trailer"}
</button>

        </div>

        {movie?.error && (
          <div className="mt-8 rounded-xl bg-red-900/40 border border-red-500 p-5">
            {movie.error}
          </div>
        )}

        {movie && !movie.error && (
          <div className="mt-10 rounded-3xl border border-zinc-700 bg-zinc-900/80 p-8 shadow-2xl transition-all duration-500">
                 <div className="relative overflow-hidden rounded-3xl mb-8">
  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

  <img
    src={movie.posterUrl}
    alt={movie.title}
    className="w-full h-80 object-cover opacity-40"
  />

  <div className="absolute bottom-8 left-8">
    <h2 className="text-5xl font-extrabold">
      🎬 {movie.title}
    </h2>

    <p className="mt-2 text-gray-300">
      AI Original • {movie.genre} • ⭐ {movie.rating}
    </p>
  </div>
</div>  
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
  <div className="rounded-xl bg-zinc-900 p-4 text-center">
    <p className="text-gray-400 text-sm">⭐ Rating</p>
    <p className="text-2xl font-bold">
      {movie.rating}/10
    </p>
  </div>

  <div className="rounded-xl bg-zinc-900 p-4 text-center">
    <p className="text-gray-400 text-sm">🎭 Genre</p>
    <p className="text-2xl font-bold">
      {movie.genre}
    </p>
  </div>

  <div className="rounded-xl bg-zinc-900 p-4 text-center">
    <p className="text-gray-400 text-sm">⏱ Runtime</p>
    <p className="text-2xl font-bold">
      {movie.runtime}
    </p>
  </div>

  <div className="rounded-xl bg-zinc-900 p-4 text-center">
    <p className="text-gray-400 text-sm">🎬 Director</p>
    <p className="text-2xl font-bold">
      {movie.director || "AI Studio"}
    </p>
  </div>
</div>

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
            <div className="mt-6">
  <div className="flex justify-between mb-2">
    <span className="font-semibold">⭐ IMDb Rating</span>
    <span>{movie.rating}/10</span>
  </div>

  <div className="w-full h-3 bg-zinc-700 rounded-full overflow-hidden">
    <div
      className="h-full bg-yellow-400 transition-all duration-700"
      style={{
        width: `${Number(movie.rating) * 10}%`,
      }}
    />
  </div>
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

            {trailer && (
  <div className="mt-10 rounded-2xl border border-purple-500/30 bg-purple-950/20 p-6">
    <h3 className="text-3xl font-bold mb-6">
      🎥 AI Trailer
    </h3>

    <div className="mb-6">
      <h4 className="text-xl font-semibold mb-2">
        🎙️ Voice Over
      </h4>

      <p className="text-gray-300 leading-8">
        {trailer.voiceOver}
      </p>
    </div>

    <div className="mb-6">
      <h4 className="text-xl font-semibold mb-2">
        🎵 Background Music
      </h4>

      <p className="text-gray-300">
        {trailer.music}
      </p>
    </div>

    <div>
      <h4 className="text-xl font-semibold mb-4">
        🎬 Trailer Scenes
      </h4>

      <div className="space-y-3">
        {trailer.scenes?.map((scene: string, index: number) => (
          <div
            key={index}
            className="rounded-xl bg-zinc-800 p-4"
          >
            <span className="font-bold text-purple-400">
              Scene {index + 1}
            </span>

            <p className="mt-2 text-gray-300">
              {scene}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
<div className="mt-10">
  <h3 className="text-2xl font-bold mb-5">
    🍿 More Like This
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
    {[
      "The Dark Future",
      "Cyber Hunter",
      "Shadow Protocol",
    ].map((title, index) => (
      <div
        key={index}
        className="rounded-2xl bg-zinc-800 hover:bg-zinc-700 transition p-5 cursor-pointer"
      >
        <div className="h-40 rounded-xl bg-gradient-to-br from-red-600 to-purple-700 mb-4" />

        <h4 className="text-xl font-bold">
          {title}
        </h4>

        <p className="text-gray-400 mt-2">
          AI Original Movie
        </p>
      </div>
    ))}
  </div>
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