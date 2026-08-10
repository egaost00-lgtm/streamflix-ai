"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        const res = await fetch(`/api/tmdb/${category}`);
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadMovies();
  }, [category]);

  const scrollLeft = () => {
    rowRef.current?.scrollBy({
      left: -1200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    rowRef.current?.scrollBy({
      left: 1200,
      behavior: "smooth",
    });
  };

  return (
    <section className="group relative -mt-20 z-30 px-6 md:px-12 lg:px-16 pb-16 bg-gradient-to-t from-black via-black to-transparent">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">
          {title}
        </h2>
      </div>

      {/* Left Button */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/70 p-3 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100 md:flex"
      >
        <ChevronLeft size={34} />
      </button>

      {/* Right Button */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/70 p-3 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100 md:flex"
      >
        <ChevronRight size={34} />
      </button>

      {/* Movies */}
      <div
        ref={rowRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-6"
      >
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