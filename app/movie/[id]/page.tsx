import Link from "next/link";
import Image from "next/image";
import {
  getMovieDetails,
  getMovieVideos,
  getSimilarMovies,
  getMovieCredits,
} from "@/lib/tmdb";
import TrailerModal from "@/app/components/TrailerModal";
import MyListButton from "@/app/components/MyListButton";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
const movie = await getMovieDetails(id);
const videos = await getMovieVideos(id);
const similarMovies = await getSimilarMovies(id);
const credits = await getMovieCredits(id);

const trailer = videos.results.find(
  (video: any) =>
    video.site === "YouTube" &&
    video.type === "Trailer"
);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-end overflow-hidden">
        <Image
  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
  alt={movie.title}
  fill
  priority
  className="object-cover"
/>

<div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 mx-auto flex max-w-7xl items-end gap-12 px-16 pb-20">
          <div className="hidden md:block shrink-0">
  <Image
    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    alt={movie.title}
    width={320}
    height={480}
    className="rounded-2xl shadow-2xl"
  />
</div>
          <Link
            href="/"
            className="inline-block mb-6 text-gray-300 hover:text-white"
          >
            ← Back to Home
          </Link>

          <h1 className="text-6xl font-extrabold mb-4">
            {movie.title}
          </h1>

          <div className="flex gap-4 text-gray-300 mb-6">
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <span>{movie.release_date?.slice(0, 4)}</span>
            <span>
  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
</span>
     <div className="flex flex-wrap gap-2">
  {movie.genres?.map((genre: any) => (
    <span
      key={genre.id}
      className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm text-white backdrop-blur-sm"
    >
      {genre.name}
    </span>
  ))}
</div>
          </div>

          <p className="max-w-3xl text-lg text-gray-200 leading-8">
  {movie.overview}
</p>

          <div className="flex gap-4 mt-8">
{trailer ? (
  <TrailerModal trailerKey={trailer.key} />
) : (
  <button
    disabled
    className="bg-gray-600 px-8 py-4 rounded-lg cursor-not-allowed"
  >
    Trailer Not Available
  </button>
)}

            <MyListButton
  movie={{
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
  }}
/>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-6 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-md">
  <div>
    <p className="text-xs uppercase text-gray-400">Rating</p>
    <p className="font-semibold">⭐ {movie.vote_average.toFixed(1)}/10</p>
  </div>

  <div>
    <p className="text-xs uppercase text-gray-400">Runtime</p>
    <p className="font-semibold">
      {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
    </p>
  </div>

  <div>
    <p className="text-xs uppercase text-gray-400">Language</p>
    <p className="font-semibold">
      {movie.original_language?.toUpperCase()}
    </p>
  </div>

  <div>
    <p className="text-xs uppercase text-gray-400">Release</p>
    <p className="font-semibold">
      {movie.release_date}
    </p>
  </div>
</div>
      <section className="max-w-7xl mx-auto px-10 py-16">
  <h2 className="text-3xl font-bold mb-8">More Like This</h2>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
    {similarMovies.results.slice(0, 6).map((movie: any) => (
      <Link
  key={movie.id}
  href={`/movie/${movie.id}`}
  className="group"
>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
        />

        <p className="mt-3 text-center text-sm font-medium transition-colors duration-300 group-hover:text-red-400">
          {movie.title}
        </p>
      </Link>
    ))}
  </div>
</section>
<section className="max-w-7xl mx-auto px-10 py-16">
  <h2 className="text-3xl font-bold mb-8">Top Cast</h2>

  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
    {credits.cast.slice(0, 6).map((actor: any) => (
      <div key={actor.id} className="text-center">
        <Image
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
              : "/placeholder.png"
          }
          alt={actor.name}
          width={180}
          height={180}
          className="w-32 h-32 rounded-full object-cover mx-auto"
        />

        <h3 className="mt-4 font-semibold">{actor.name}</h3>

        <p className="text-sm text-gray-400">
          {actor.character}
        </p>
      </div>
    ))}
  </div>
</section>
    </main>
  );
}