import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.TMDB_API_KEY;

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");

  if (!query) {
    return NextResponse.json([]);
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );

  const data = await res.json();

  return NextResponse.json(data.results);
}