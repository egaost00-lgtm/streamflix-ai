import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const API_KEY = process.env.TMDB_API_KEY;

export async function GET() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );

    const data = await res.json();

    return NextResponse.json(data.results.slice(0, 10));
  } catch {
    return NextResponse.json(
      { error: "Failed to load featured movies" },
      { status: 500 }
    );
  }
}