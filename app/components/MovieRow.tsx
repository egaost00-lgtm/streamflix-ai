import MovieCard from "./MovieCard";
import { movies } from "../data/movies";

type MovieRowProps = {
  title: string;
  search: string;
};

export default function MovieRow({
  title,
  search,
}: MovieRowProps) {
  return (
    <section className="relative -mt-36 z-30 px-16 pb-20 bg-gradient-to-t from-black via-black to-transparent">
      <h2 className="text-3xl font-bold text-white mb-8">
        {title}
      </h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
        {movies
  .filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  )
  .map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </section>
  );
}