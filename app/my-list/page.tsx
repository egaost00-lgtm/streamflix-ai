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
  .eq("user_id", user?.id)
  .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-10">🎬 My List</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies?.map((movie: any) => (
          <Link key={movie.id} href={`/movie/${movie.movie_id}`}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_url}`}
              alt={movie.title}
              width={300}
              height={450}
              className="rounded-xl hover:scale-105 transition"
            />

            <p className="mt-3 text-center font-medium">
  {movie.title}
</p>

<RemoveButton id={movie.id} />
          </Link>
        ))}
      </div>
    </main>
  );
}