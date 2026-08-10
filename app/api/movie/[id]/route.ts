import { NextRequest, NextResponse } from "next/server";
import { getMovieDetails } from "@/lib/tmdb";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const movie = await getMovieDetails(id);

    return NextResponse.json(movie);
  } catch (error) {
    console.error("Movie API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch movie details",
      },
      {
        status: 500,
      }
    );
  }
}