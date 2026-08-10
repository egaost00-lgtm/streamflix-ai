import { createClient } from "@/lib/supabase-server";
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
  const supabase = await createClient();

const { data: uploadedMovie } = await supabase
  .from("movies")
  .select("*")
  .eq("id", id)
  .single();

  let movie;

if (uploadedMovie) {
  movie = uploadedMovie;
} else {
  movie = await getMovieDetails(id);
}
  let videos = { results: [] };
let similarMovies = { results: [] };
let credits = { cast: [] };

if (!uploadedMovie) {
  videos = await getMovieVideos(id);
  similarMovies = await getSimilarMovies(id);
  credits = await getMovieCredits(id);
}
const trailer: any = uploadedMovie
  ? null
  : videos.results.find(
      (video: any) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    );

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
<Image
  src={
  uploadedMovie
    ? (movie.banner_url || movie.poster_url)
    : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
}
          alt={movie.title}
          fill
          priority
          className="object-cover"
        />
        

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

        <div className="relative z-10 mx-auto flex max-w-7xl w-full items-end gap-16 px-8 lg:px-16 pb-16">

          {/* Poster */}
          <div className="hidden lg:block shrink-0">
 <img
  src={
  uploadedMovie
    ? (movie.poster_url || "/no-poster.png")
    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
}

              alt={movie.title}
              width={260}
              height={390}
              className="rounded-2xl shadow-2xl"
            />
          </div>

          {/* Content */}
          <div className="flex-1">

            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-white/10 px-5 py-2 backdrop-blur-md hover:bg-white/20 transition mb-8"
            >
              ← Back
            </Link>

            <h1 className="text-5xl lg:text-7xl font-black mb-6">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">

              <span className="font-semibold">
                ⭐ {(uploadedMovie ? movie.rating : movie.vote_average).toFixed(1)}
              </span>

              <span>
                {uploadedMovie ? movie.release_year : movie.release_date?.slice(0, 4)}
              </span>

              <span>
                {uploadedMovie ? "N/A" : `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
              </span>

              {movie.genres?.map((genre: any) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm"
                >
                  {genre.name}
                </span>
              ))}

            </div>

            <p className="max-w-4xl text-lg leading-8 text-gray-200">
              {movie.overview}
            </p>

            <div className="flex gap-5 mt-10">
{uploadedMovie ? (
  <Link
    href={`/watch/${movie.id}`}
    className="rounded-xl bg-red-600 hover:bg-red-700 px-8 py-4 font-semibold transition"
  >
    ▶ Play Movie
  </Link>
) : trailer ? (
  <TrailerModal trailerKey={trailer.key} />
) : (
  <button
    disabled
    className="rounded-xl bg-gray-700 px-8 py-4"
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

      </section>

      {/* Movie Info */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16 py-10">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-2xl bg-white/5 border border-white/10 p-6">

          <div>
            <p className="text-gray-400 text-sm">Rating</p>
            <p className="font-bold">
              ⭐ {(uploadedMovie ? movie.rating : movie.vote_average).toFixed(1)}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Runtime</p>
            <p className="font-bold">
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Language</p>
            <p className="font-bold">
 {uploadedMovie ? "N/A" : movie.original_language.toUpperCase()}
</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Release</p>
            <p className="font-bold">
              {uploadedMovie ? movie.release_year : movie.release_date}
            </p>
          </div>

        </div>

      </section>

      {/* Cast */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16 py-12">

        <h2 className="text-3xl font-bold mb-8">
          Top Cast
        </h2>

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

              <h3 className="mt-4 font-semibold">
                {actor.name}
              </h3>

              <p className="text-gray-400 text-sm">
                {actor.character}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Similar */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16 pb-20">

        <h2 className="text-3xl font-bold mb-8">
          More Like This
        </h2>

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
                className="rounded-xl group-hover:scale-105 transition"
              />

              <p className="mt-3 text-center group-hover:text-red-500">
                {movie.title}
              </p>

            </Link>

          ))}

        </div>

      </section>

    </main>
  );
}