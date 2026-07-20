import { NextResponse } from "next/server";
import { getTrendingMovies } from "@/lib/tmdb";

export async function GET() {
  try {
    const data = await getTrendingMovies();
    return NextResponse.json(data.results);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}