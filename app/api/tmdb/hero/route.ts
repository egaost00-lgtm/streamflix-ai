import { NextResponse } from "next/server";

const API_KEY = process.env.TMDB_API_KEY;

export async function GET() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );

    const data = await res.json();

    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length)];

    return NextResponse.json(randomMovie);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}