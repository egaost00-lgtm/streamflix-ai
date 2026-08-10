"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { saveMovie } from "@/lib/myList";

type Props = {
  movie: {
    id: number;
    title: string;
    poster_path: string;
  };
};

export default function MyListButton({ movie }: Props) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setLoading(true);

    const success = await saveMovie({
      movie_id: movie.id,
      title: movie.title,
      poster_url: movie.poster_path,
    });

    setLoading(false);

    if (success) {
      setSaved(true);
    }
  }

  return (
    <button
      onClick={handleSave}
      disabled={loading || saved}
      className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black disabled:opacity-70"
    >
      {saved ? (
        <>
          <Check size={20} />
          Added
        </>
      ) : (
        <>
          <Plus size={20} />
          {loading ? "Saving..." : "My List"}
        </>
      )}
    </button>
  );
}