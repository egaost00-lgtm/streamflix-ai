
export const dynamic = "force-dynamic";import { NextResponse } from "next/server";

const API_KEY = process.env.TMDB_API_KEY;

export async function GET() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
  );

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  const randomMovie =
  data.results[Math.floor(Math.random() * data.results.length)];

return NextResponse.json(randomMovie);
}