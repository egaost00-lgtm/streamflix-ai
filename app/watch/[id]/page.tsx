"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
export default function WatchPage() {
    const [saved, setSaved] = useState(false);
    useEffect(() => {
  const isSaved = localStorage.getItem("watchlist");
  if (isSaved === "true") {
    setSaved(true);
  }
}, []);
  return (
    <div className="min-h-screen bg-black">

      <div className="p-4">
        <Link
          href="/"
          className="text-white bg-red-600 px-4 py-2 rounded-lg"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="px-6">
  <h1 className="text-4xl font-bold text-white">
    Unlimited AI Movies
  </h1>

  <p className="text-gray-400 mt-2">
    Watch AI-generated movies in stunning quality.
  </p>
  <div className="flex gap-4 mt-4 text-gray-300">
    <div className="mt-6">
  <button
  onClick={() => {
  setSaved(true);
  localStorage.setItem("watchlist", "true");
}}
  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
>
  {saved ? "✅ Added to Watchlist" : "❤️ Add to Watchlist"}
</button>
</div>
  <span>⭐ 9.8/10</span>
  <span>🎬 AI Original</span>
  <span>⏱ 2h 15m</span>
  <span>🔥 Trending</span>
</div>
</div>
      <div className="flex justify-center p-6">
        <video
          controls
          autoPlay
          className="w-full max-w-5xl rounded-xl shadow-2xl"
        >
          <source src="/videos/demo.mp4" type="video/mp4" />
        </video>
      </div>

    </div>
  );
}