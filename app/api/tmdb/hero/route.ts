
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const API_KEY = process.env.TMDB_API_KEY;

export async function GET() {
  try {
    // Get trending movies
    const trendingRes = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );

    const trendingData = await trendingRes.json();

    if (!trendingRes.ok) {
      return NextResponse.json(trendingData, {
        status: trendingRes.status,
      });
    }

    const movie =
      trendingData.results[
        Math.floor(Math.random() * trendingData.results.length)
      ];

    // Get videos for that movie
    const videosRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
    );

    const videosData = await videosRes.json();

    const trailer = videosData.results?.find(
      (video: any) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    );

    return NextResponse.json({
      ...movie,
      trailerKey: trailer?.key || null,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to load hero movie." },
      { status: 500 }
    );
  }
}