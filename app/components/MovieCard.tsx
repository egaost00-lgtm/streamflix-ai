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
      className="group relative block min-w-[240px] transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:z-20"
    >
      <div className="relative h-[360px] w-[240px] overflow-hidden rounded-3xl">
        <Image
          src={movie.image}
          alt={movie.title}
          fill
          sizes="220px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button className="rounded-full bg-white px-6 py-3 font-bold text-black shadow-lg">
            ▶ Play
          </button>

          <div className="flex gap-3">
            <button className="rounded-full bg-zinc-800/90 p-3 text-white hover:bg-red-600 transition">
              ❤️
            </button>

            <button className="rounded-full bg-zinc-800/90 p-3 text-white hover:bg-blue-600 transition">
              ℹ️
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold">{movie.title}</h3>

          <p className="text-sm text-gray-300">
            ⭐ {movie.rating.toFixed(1)}
          </p>

          <p className="text-xs text-gray-400">
            {movie.year}
          </p>

          <span className="mt-2 inline-block rounded bg-red-600 px-2 py-1 text-xs">
            {movie.genre}
          </span>
        </div>
      </div>
    </Link>
  );
}