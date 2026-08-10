import RemoveButton from "@/app/components/RemoveButton";
import { createClient } from "@/lib/supabase-server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MyListPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: movies } = await supabase
    .from("my_list")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-black text-white px-8 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-12">

        <Link
          href="/"
          className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white hover:bg-red-600 transition"
        >
          ← Back to Home
        </Link>
<div>
  <h1 className="text-4xl font-extrabold">
    ❤️ My List
  </h1>

  <p className="mt-2 text-gray-400">
    {movies?.length || 0} movie{movies?.length === 1 ? "" : "s"} saved
  </p>
</div>

      </div>

      {/* Empty State */}
      {(!movies || movies.length === 0) ? (
        <div className="flex flex-col items-center justify-center mt-32">

          <div className="text-7xl mb-6">🎬</div>

          <h2 className="text-3xl font-bold mb-3">
            Your My List is Empty
          </h2>

          <p className="text-gray-400 mb-8">
            Start adding your favourite movies.
          </p>

          <Link
            href="/"
            className="rounded-full bg-red-600 px-8 py-4 font-bold hover:bg-red-700 transition"
          >
            Browse Movies
          </Link>

        </div>
      ) : (

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">

          {movies.map((movie: any) => (

            <div
              key={movie.id}
              className="group"
            >

              <Link href={`/movie/${movie.movie_id}`}>

                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_url}`}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="rounded-2xl transition duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                />

              </Link>

              <p className="mt-3 text-center font-semibold line-clamp-2">
                {movie.title}
              </p>

              <div className="mt-3 flex justify-center">
                <RemoveButton id={movie.id} />
              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}