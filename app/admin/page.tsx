"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
export default function AdminPage() {
  const [movies, setMovies] = useState<any[]>([]);

useEffect(() => {
  async function loadMovies() {
    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .order("id", { ascending: false });

    if (!error) {
      setMovies(data || []);
    }
  }

  loadMovies();
}, []);
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-zinc-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold">🎬 StreamFlix AI Admin</h1>
            <p className="mt-1 text-sm text-gray-400">
              Manage your movies and platform.
            </p>
          </div>

<Link
  href="/admin/add-movie"
  className="rounded-xl bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-700"
>
  + Add Movie
</Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-8 py-10">
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
            <p className="text-gray-400">Movies</p>
            <h2 className="mt-3 text-4xl font-bold">{movies.length}</h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
            <p className="text-gray-400">Users</p>
            <h2 className="mt-3 text-4xl font-bold">248</h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
            <p className="text-gray-400">Views</p>
            <h2 className="mt-3 text-4xl font-bold">8,421</h2>
          </div>
        </div>

        {/* Movie Table */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full">
            <thead className="bg-zinc-900">
              <tr className="text-left">
                <th className="px-6 py-4">Movie</th>
                <th className="px-6 py-4">Genre</th>
                <th className="px-6 py-4">Year</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

        <tbody>
  {movies.map((movie) => (
    <tr key={movie.id} className="border-t border-white/10">
      <td className="px-6 py-4">{movie.title}</td>

      <td className="px-6 py-4">{movie.genre}</td>

      <td className="px-6 py-4">{movie.release_year}</td>

      <td className="px-6 py-4">
        <span className="rounded-full bg-green-600 px-3 py-1 text-sm">
          Published
        </span>
      </td>

      <td className="space-x-2 px-6 py-4">
       <Link
  href={`/admin/edit-movie/${movie.id}`}
  className="rounded-lg bg-blue-600 px-3 py-2 text-sm hover:bg-blue-700"
>
  Edit
</Link>
<button
  onClick={async () => {
    const confirmDelete = confirm(
      `Delete "${movie.title}"?`
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("movies")
      .delete()
      .eq("id", movie.id);

    if (error) {
      alert("Failed to delete movie.");
      console.error(error);
      return;
    }

    setMovies((prev) =>
      prev.filter((m) => m.id !== movie.id)
    );

    alert("Movie deleted successfully!");
  }}
  className="rounded-lg bg-red-600 px-3 py-2 text-sm hover:bg-red-700"
>
  Delete
</button>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </main>
    </div>
  );
}