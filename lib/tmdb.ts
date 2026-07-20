const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchMovies(endpoint: string) {
  const separator = endpoint.includes("?") ? "&" : "?";

  const res = await fetch(
    `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch TMDB");
  }

  return res.json();
}

export const getTrendingMovies = () =>
  fetchMovies("/trending/movie/week");

export const getTopRatedMovies = () =>
  fetchMovies("/movie/top_rated");

export const getPopularMovies = () =>
  fetchMovies("/movie/popular");

export const getSciFiMovies = () =>
  fetchMovies("/discover/movie?with_genres=878");

export const getComedyMovies = () =>
  fetchMovies("/discover/movie?with_genres=35");

export const getMovieDetails = (id: string) =>
  fetchMovies(`/movie/${id}`);

// ✅ NEW
export const getMovieVideos = (id: string) =>
  fetchMovies(`/movie/${id}/videos`);
export const getSimilarMovies = (id: string) =>
  fetchMovies(`/movie/${id}/similar`);
export const getMovieCredits = (id: string) =>
  fetchMovies(`/movie/${id}/credits`);