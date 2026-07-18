import { movies } from "@/app/data/movies";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MovieDetails({ params }: Props) {
  const { id } = await params;

  const movie = movies.find(
    (m) => m.id === Number(id)
  );

  if (!movie) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative h-[70vh] w-full">
        <Image
          src={movie.image}
          alt={movie.title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute bottom-20 left-20">
          <h1 className="text-6xl font-bold">
            {movie.title}
          </h1>

          <p className="mt-4 text-xl text-gray-300">
            ⭐ {movie.rating} • {movie.year}
          </p>

          <span className="inline-block mt-4 bg-red-600 px-4 py-2 rounded-full">
            {movie.genre}
          </span>
        </div>
      </div>
    </main>
  );
}