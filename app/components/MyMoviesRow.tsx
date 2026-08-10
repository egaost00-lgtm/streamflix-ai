"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import MovieCard from "./MovieCard";

export default function MyMoviesRow() {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    async function loadMovies() {
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setMovies(data || []);
    }

    loadMovies();
  }, []);

  return (
    <section className="px-6 md:px-12 lg:px-16 pb-16">
      <h2 className="mb-6 text-3xl font-bold text-white">
        🎬 My Uploaded Movies
      </h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={{
              id: movie.id,
              title: movie.title,
              year: movie.release_year,
              rating: movie.rating,
              genre: movie.genre,
              image: movie.poster_url,
            }}
          />
        ))}
      </div>
    </section>
  );
}