"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";


export default function AddMoviePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [rating, setRating] = useState("");

  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  async function handlePublish() {
  try {
    setLoading(true);

    if (!posterFile) {
      alert("Please select a poster.");
      return;
    }

    const fileName = `${Date.now()}-${posterFile.name}`;

    const { error } = await supabase.storage
      .from("posters")
      .upload(fileName, posterFile);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("posters")
      .getPublicUrl(fileName);
      if (!videoFile) {
  alert("Please select a movie video.");
  return;
}

const videoFileName = `${Date.now()}-${videoFile.name}`;

const { error: videoError } = await supabase.storage
  .from("movies")
  .upload(videoFileName, videoFile);

if (videoError) throw videoError;

const {
  data: { publicUrl: videoUrl },
} = supabase.storage
  .from("movies")
  .getPublicUrl(videoFileName);

console.log(videoUrl);
const { error: insertError } = await supabase
  .from("movies")
  .insert({
    title,
    description,
    genre,
    release_year: Number(releaseYear),
    rating: Number(rating),
    poster_url: publicUrl,
    banner_url: publicUrl,
    video_url: videoUrl,
  });

if (insertError) throw insertError;

alert("🎉 Movie published successfully!");

    console.log(publicUrl);

    alert("✅ Poster uploaded successfully!");
} catch (err: any) {
  console.error(err);
  alert(err?.message || JSON.stringify(err));
}
   finally {
    setLoading(false);
  }
}
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold">➕ Add New Movie</h1>
            <p className="mt-1 text-gray-400">
              Upload a new movie to StreamFlix AI
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-lg bg-zinc-800 px-5 py-3 hover:bg-zinc-700"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-8 py-10">
        <div className="grid gap-8">

          <input
  type="text"
  placeholder="Movie Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className="rounded-xl border border-white/10 bg-zinc-900 p-4 outline-none focus:border-red-500"
/>

         <textarea
  rows={5}
  placeholder="Movie Description..."
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="rounded-xl border border-white/10 bg-zinc-900 p-4 outline-none focus:border-red-500"
/>

          <div className="grid gap-6 md:grid-cols-3">
  <input
  type="text"
  placeholder="Genre"
  value={genre}
  onChange={(e) => setGenre(e.target.value)}
  className="rounded-xl border border-white/10 bg-zinc-900 p-4"
/>

          <input
  type="number"
  placeholder="Release Year"
  value={releaseYear}
  onChange={(e) => setReleaseYear(e.target.value)}
  className="rounded-xl border border-white/10 bg-zinc-900 p-4"
/>
           <input
  type="number"
  step="0.1"
  placeholder="Rating"
  value={rating}
  onChange={(e) => setRating(e.target.value)}
  className="rounded-xl border border-white/10 bg-zinc-900 p-4"
/>
          </div>

          <div className="rounded-2xl border-2 border-dashed border-white/20 p-10 text-center">
            <h2 className="text-xl font-semibold">🖼 Upload Poster</h2>
            <input
  type="file"
  accept="image/*"
  className="mt-5"
  onChange={(e) => {
    if (e.target.files?.length) {
      setPosterFile(e.target.files[0]);
    }
  }}
/>
          </div>

          <div className="rounded-2xl border-2 border-dashed border-white/20 p-10 text-center">
            <h2 className="text-xl font-semibold">🎥 Upload Movie Video</h2>
            <input
  type="file"
  accept="video/*"
  className="mt-5"
  onChange={(e) => {
    if (e.target.files?.length) {
      setVideoFile(e.target.files[0]);
    }
  }}
/>
          </div>
<button
  onClick={handlePublish}
  disabled={loading}
  className="rounded-xl bg-red-600 py-4 text-lg font-bold transition hover:bg-red-700 disabled:opacity-50"
>
  {loading ? "Uploading..." : "🚀 Publish Movie"}
</button>
        </div>
      </main>
    </div>
  );
}