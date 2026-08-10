import Image from "next/image";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
  image: string;
};

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative block min-w-[240px] transition-all duration-500 hover:z-30 hover:-translate-y-3 hover:scale-105"
    >
      <div className="relative h-[360px] w-[240px] overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-xl transition-all duration-500 group-hover:border-red-500/40 group-hover:shadow-[0_20px_60px_rgba(239,68,68,0.25)]">

        {/* Poster */}
      <img
  src={movie.image}
  alt={movie.title}
  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
/>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />

        {/* Hover Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 transition-all duration-300 group-hover:opacity-100">

          {/* Play Button */}
          <button className="rounded-full bg-white px-7 py-3 font-semibold text-black shadow-xl transition-all duration-300 hover:scale-105 hover:bg-red-600 hover:text-white">
            ▶ Play
          </button>

          {/* Action Buttons */}
          <div className="flex gap-3">

            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-red-600">
              ❤️
            </button>

            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-blue-600">
              ℹ️
            </button>

          </div>

        </div>

        {/* Movie Info */}
        <div className="absolute bottom-0 left-0 right-0 p-5">

          <h3 className="line-clamp-1 text-lg font-bold text-white">
            {movie.title}
          </h3>

          <div className="mt-2 flex items-center gap-3 text-sm text-gray-300">
            <span>⭐ {movie.rating.toFixed(1)}</span>
            <span>•</span>
            <span>{movie.year}</span>
          </div>

          <span className="mt-3 inline-flex rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
            {movie.genre}
          </span>

        </div>

      </div>
    </Link>
  );
}