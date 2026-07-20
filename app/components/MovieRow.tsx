"use client";

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

type MovieRowProps = {
  title: string;
  search: string;
  category: string;
};

export default function MovieRow({
  title,
  search,
  category,
}: MovieRowProps) {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/tmdb/${category}`)
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, [category]);

  return (
    <section className="relative -mt-20 z-30 px-16 pb-20 bg-gradient-to-t from-black via-black to-transparent">
      <h2 className="text-3xl font-bold text-white mb-8">
        {title}
      </h2>

      <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-6">
        {movies
          .filter(
            (movie) =>
              movie.poster_path &&
              movie.title?.toLowerCase().includes(search.toLowerCase())
          )
          .map((movie) => (
            <MovieCard
              key={movie.id}
              movie={{
                id: movie.id,
                title: movie.title,
                year: Number(movie.release_date?.slice(0, 4)) || 0,
                rating: movie.vote_average || 0,
                genre: "Movie",
                image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
            />
          ))}
      </div>
    </section>
  );
}