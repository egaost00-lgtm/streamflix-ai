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
      className="group relative min-w-[220px] cursor-pointer block transition-transform duration-300 hover:scale-105"
    >
      <div className="relative h-[330px] w-[220px] overflow-hidden rounded-xl">
        <Image
          src={movie.image}
          alt={movie.title}
          fill
          sizes="220px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="text-lg font-bold text-white">
            {movie.title}
          </h3>

          <p className="mt-1 text-sm text-gray-300">
            ⭐ {movie.rating} • {movie.year}
          </p>

          <span className="mt-2 inline-block rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
            {movie.genre}
          </span>
        </div>
      </div>
    </Link>
  );
}