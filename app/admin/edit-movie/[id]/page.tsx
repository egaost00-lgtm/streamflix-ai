"use client";

import { use, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EditMoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    async function loadMovie() {
      const { data } = await supabase
        .from("movies")
        .select("*")
        .eq("id", id)
        .single();

      if (data) setMovie(data);
    }

    loadMovie();
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  async function saveMovie() {
    let posterUrl = movie.poster_url;
    let videoUrl = movie.video_url;

    if (posterFile) {
      const posterPath = `posters/${Date.now()}-${posterFile.name}`;

      const { error } = await supabase.storage
        .from("posters")
        .upload(posterPath, posterFile, { upsert: true });

      if (!error) {
        posterUrl = supabase.storage
          .from("posters")
          .getPublicUrl(posterPath).data.publicUrl;
      }
    }

    if (videoFile) {
      const videoPath = `movies/${Date.now()}-${videoFile.name}`;

      const { error } = await supabase.storage
        .from("movies")
        .upload(videoPath, videoFile, { upsert: true });

      if (!error) {
        videoUrl = supabase.storage
          .from("movies")
          .getPublicUrl(videoPath).data.publicUrl;
      }
    }

    const { error } = await supabase
      .from("movies")
      .update({
        title: movie.title,
        description: movie.description,
        genre: movie.genre,
        release_year: movie.release_year,
        poster_url: posterUrl,
        video_url: videoUrl,
      })
      .eq("id", id);

    if (error) {
      alert("Failed to update movie.");
      return;
    }

    alert("Movie updated successfully!");
  }

  return (
    <div className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-4xl font-bold">✏️ Edit Movie</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

        <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl">
          <h2 className="mb-4 text-xl font-semibold">🎬 Poster Preview</h2>

          <img
            src={movie.poster_url}
            alt={movie.title}
            className="h-[420px] w-full rounded-2xl object-cover"
          />

          <label className="mt-6 mb-2 block text-sm text-gray-400">
            Replace Poster
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPosterFile(e.target.files?.[0] || null)}
            className="w-full rounded-xl border border-white/10 bg-black/40 p-3"
          />
        </div>

        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-zinc-900/70 p-8 backdrop-blur-xl space-y-6">

          <h2 className="text-2xl font-bold">🎥 Movie Information</h2>

          <input
            className="w-full rounded-xl bg-black/40 border border-white/10 p-4"
            value={movie.title}
            onChange={(e)=>setMovie({...movie,title:e.target.value})}
            placeholder="Movie Title"
          />

          <input
            className="w-full rounded-xl bg-black/40 border border-white/10 p-4"
            value={movie.genre || ""}
            placeholder="Genre"
            onChange={(e)=>setMovie({...movie,genre:e.target.value})}
          />

          <input
            type="number"
            className="w-full rounded-xl bg-black/40 border border-white/10 p-4"
            value={movie.release_year || ""}
            placeholder="Release Year"
            onChange={(e)=>setMovie({...movie,release_year:Number(e.target.value)})}
          />

          <textarea
            className="h-40 w-full rounded-xl bg-black/40 border border-white/10 p-4"
            value={movie.description}
            placeholder="Description"
            onChange={(e)=>setMovie({...movie,description:e.target.value})}
          />

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Replace Video
            </label>

            <input
              type="file"
              accept="video/*"
              onChange={(e)=>setVideoFile(e.target.files?.[0] || null)}
              className="w-full rounded-xl border border-white/10 bg-black/40 p-3"
            />
          </div>

          <button
            onClick={saveMovie}
            className="w-full rounded-xl bg-red-600 py-4 text-lg font-semibold hover:bg-red-700 transition"
          >
            💾 Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}
