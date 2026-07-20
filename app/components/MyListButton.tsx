"use client";

import { useState } from "react";
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
  return (
   <button
onClick={async () => {


  setLoading(true);

  const success = await saveMovie({
    movie_id: movie.id,
    title: movie.title,
    poster_url: movie.poster_path,
  });

  setLoading(false);

  if (success) {
    alert("✅ Added to My List");
  } else {
    alert("❌ Failed to save movie");
  }
}}
  disabled={loading}
  className="border border-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition disabled:opacity-50"
>
  {loading ? "Saving..." : "+ My List"}
</button>
  );
}