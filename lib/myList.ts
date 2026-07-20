import { supabase } from "./supabase";

export async function saveMovie(movie: {
  movie_id: number;
  title: string;
  poster_url: string;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please sign in first.");
    return false;
  }

  const { error } = await supabase.from("my_list").insert([
    {
      user_id: user.id,
      movie_id: movie.movie_id,
      title: movie.title,
      poster_url: movie.poster_url,
    },
  ]);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}
export async function deleteMovie(id: number) {
  const { error } = await supabase
    .from("my_list")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}