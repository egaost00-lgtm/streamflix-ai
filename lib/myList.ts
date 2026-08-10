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

  // Check if movie already exists
  const { data: existing, error: checkError } = await supabase
    .from("my_list")
    .select("id")
    .eq("user_id", user.id)
    .eq("movie_id", movie.movie_id)
    .maybeSingle();

  if (checkError) {
    console.error(checkError);
    return false;
  }

  if (existing) {
    alert("✅ Movie already exists in My List");
    return true;
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

export async function deleteMovie(id: string) {
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
export async function getMyList() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("my_list")
    .select("*")
    .eq("user_id", user.id)
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}