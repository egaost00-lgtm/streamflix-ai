"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clapperboard,
  Share2,
  Trash2,
  Play,
  Star,
  Clock,
  Film,
  User,
  Image as ImageIcon,
  Sparkles,
  WandSparkles,
  ChevronRight,
} from "lucide-react";

type CastMember = {
  name: string;
  role?: string;
};

type Movie = {
  title: string;
  tagline?: string;
  genre: string;
  rating: string;
  runtime: string;
  year?: string;
  director?: string;
  story: string;
  cast: CastMember[] | string[];
  posterPrompt: string;
  posterUrl: string;
  trailerPrompt?: string;
  error?: string;
};

type Trailer = {
  voiceOver?: string;
  music?: string;
  scenes?: string[];
};

export default function AIPage() {
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [movie, setMovie] = useState<Movie | null>(null);

  const [loading, setLoading] = useState(false);
  const [posterLoading, setPosterLoading] = useState(false);
  const [posterError, setPosterError] = useState(false);

  const [trailer, setTrailer] = useState<Trailer | null>(null);
  const [trailerLoading, setTrailerLoading] = useState(false);

  // =====================================================
  // GENERATE MOVIE
  // =====================================================

  const generateMovie = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setPosterLoading(false);
    setPosterError(false);
    setTrailer(null);
    setMovie(null);

    try {
      // -------------------------------------------------
      // STEP 1: GEMINI MOVIE
      // -------------------------------------------------

      const movieResponse = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
        }),
      });

      const movieData = await movieResponse.json();

      if (!movieResponse.ok || !movieData.success) {
        throw new Error(
          movieData.error || "Movie generation failed."
        );
      }

      const generatedMovie: Movie = {
        ...movieData.movie,
        posterUrl: "",
      };

      setMovie(generatedMovie);

      // -------------------------------------------------
      // STEP 2: FAL POSTER
      // -------------------------------------------------

      setPosterLoading(true);
      setPosterError(false);

      try {
        console.log(
          "Generating poster for:",
          generatedMovie.title
        );

        const posterResponse = await fetch(
          "/api/generate-poster",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: generatedMovie.title,
              posterPrompt: generatedMovie.posterPrompt,
            }),
          }
        );

        const posterData = await posterResponse.json();

        console.log(
          "Poster API response:",
          posterData.success
        );

        if (
          !posterResponse.ok ||
          !posterData.success ||
          !posterData.imageUrl
        ) {
          throw new Error(
            posterData.error ||
              "Poster generation failed."
          );
        }

        setMovie({
          ...generatedMovie,
          posterUrl: posterData.imageUrl,
        });

        setPosterError(false);
      } catch (error) {
        console.error(
          "Poster generation error:",
          error
        );

        setPosterError(true);

        setMovie({
          ...generatedMovie,
          posterUrl: "",
        });
      } finally {
        setPosterLoading(false);
      }
    } catch (error) {
      console.error(
        "Movie generation error:",
        error
      );

      setMovie({
        title: "",
        genre: "",
        rating: "",
        runtime: "",
        story: "",
        cast: [],
        posterPrompt: "",
        posterUrl: "",
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // CLEAR
  // =====================================================

  const clearMovie = () => {
    setPrompt("");
    setMovie(null);
    setTrailer(null);
    setPosterLoading(false);
    setPosterError(false);
  };

  // =====================================================
  // SHARE
  // =====================================================

  const shareMovie = async () => {
    if (!movie) return;

    const text = `${movie.title}

${movie.tagline || ""}

${movie.story}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: movie.title,
          text,
        });
      } else {
        await navigator.clipboard.writeText(text);
        alert("Movie copied to clipboard!");
      }
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  // =====================================================
  // TRAILER
  // =====================================================

  const generateTrailer = async () => {
    if (!movie) return;

    setTrailerLoading(true);

    try {
      const response = await fetch("/api/trailer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: movie.title,
          story: movie.story,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Trailer generation failed."
        );
      }

      setTrailer(data);
    } catch (error) {
      console.error("Trailer error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Trailer generation failed."
      );
    } finally {
      setTrailerLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030303] text-white">

      {/* =================================================
          PREMIUM BACKGROUND
      ================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute left-1/2 top-[-250px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-red-600/15 blur-[180px]" />

        <div className="absolute right-[-200px] top-[35%] h-[550px] w-[550px] rounded-full bg-purple-700/10 blur-[180px]" />

        <div className="absolute bottom-[-200px] left-[-200px] h-[500px] w-[500px] rounded-full bg-pink-600/10 blur-[180px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(80,15,25,0.55),rgba(3,3,3,0.92)_48%,#000_100%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.45)_70%,#000_100%)]" />

      </div>

      {/* =================================================
          TOP NAV
      ================================================= */}

      <nav className="sticky top-0 z-50 border-b border-white/[0.07] bg-black/60 backdrop-blur-2xl">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">

          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
            Back
          </button>

          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-purple-600 shadow-lg shadow-red-500/20">
              <Clapperboard className="h-4 w-4" />
            </div>

            <span className="hidden text-sm font-bold tracking-wide sm:block">
              STREAMFLIX <span className="text-red-500">AI</span>
            </span>

          </div>

          <div className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">
            AI STUDIO
          </div>

        </div>

      </nav>

      <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-14 md:px-8 md:pt-20">

        {/* =================================================
            HERO HEADER
        ================================================= */}

        <header className="mx-auto max-w-4xl text-center">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-bold tracking-[0.18em] text-red-300">
            <Sparkles className="h-4 w-4" />
            CREATE YOUR ORIGINAL
          </div>

          <div className="flex items-center justify-center gap-3 md:gap-5">

            <Clapperboard className="h-10 w-10 text-red-500 md:h-14 md:w-14" />

            <h1 className="text-5xl font-black tracking-[-0.04em] md:text-7xl">

              <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                StreamFlix
              </span>

              <span className="ml-2 text-white">
                AI
              </span>

            </h1>

          </div>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
            Turn a simple idea into an original movie
            concept, cinematic poster and trailer-ready
            story.
          </p>

        </header>

        {/* =================================================
            GENERATOR CARD
        ================================================= */}

        <section className="mx-auto mt-10 max-w-4xl">

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-2 shadow-[0_25px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl">

            <div className="rounded-[1.5rem] border border-white/[0.07] bg-black/60">

              <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-4">

                <WandSparkles className="h-4 w-4 text-pink-400" />

                <span className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
                  Movie Generator
                </span>

              </div>

              <textarea
                value={prompt}
                onChange={(event) =>
                  setPrompt(event.target.value)
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey
                  ) {
                    event.preventDefault();
                    generateMovie();
                  }
                }}
                placeholder="Describe your movie idea..."
                className="min-h-[150px] w-full resize-none bg-transparent px-6 py-6 text-lg leading-8 text-white outline-none placeholder:text-zinc-600 md:text-xl"
              />

              <div className="border-t border-white/[0.07] p-4">

                <div className="mb-4 flex flex-wrap gap-2">

                  {[
                    "Sci-Fi mystery",
                    "Indian superhero",
                    "Cyberpunk thriller",
                    "Epic fantasy",
                  ].map((idea) => (
                    <button
                      key={idea}
                      onClick={() => setPrompt(idea)}
                      className="rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-xs font-medium text-zinc-400 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-white"
                    >
                      {idea}
                    </button>
                  ))}

                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  <p className="text-xs text-zinc-600">
                    Press Enter to generate
                  </p>

                  <button
                    onClick={generateMovie}
                    disabled={
                      loading ||
                      !prompt.trim()
                    }
                    className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 px-7 py-3.5 font-bold shadow-lg shadow-red-600/20 transition duration-300 hover:scale-[1.02] hover:shadow-red-600/40 disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    {loading ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Clapperboard className="h-5 w-5" />
                        Generate Movie
                        <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            ACTIONS
        ================================================= */}

        {movie && !movie.error && (
          <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-3">

            <button
              onClick={clearMovie}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.09] hover:text-white"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>

            <button
              onClick={shareMovie}
              className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold transition hover:bg-green-500"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>

            <button
              onClick={generateTrailer}
              disabled={trailerLoading}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-purple-600/20 transition hover:from-purple-500 hover:to-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Play className="h-4 w-4" />

              {trailerLoading
                ? "Generating..."
                : "Generate Trailer"}
            </button>

          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {movie?.error && (
          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-red-500/25 bg-red-950/30 p-6">

            <div className="flex items-start gap-4">

              <div className="rounded-xl bg-red-500/10 p-3 text-red-400">
                !
              </div>

              <div>
                <p className="font-bold text-red-300">
                  Generation failed
                </p>

                <p className="mt-2 text-sm leading-6 text-red-200/70">
                  {movie.error}
                </p>
              </div>

            </div>

          </div>
        )}

        {/* =================================================
            MOVIE RESULT
        ================================================= */}

        {movie && !movie.error && (
          <section className="mx-auto mt-12 max-w-6xl">

            {/* =================================================
                CINEMATIC HERO
            ================================================= */}

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-[0_30px_120px_rgba(0,0,0,0.6)]">

              <div className="relative min-h-[560px] md:min-h-[720px]">

                {/* POSTER */}

                {movie.posterUrl && !posterError && (
                  <img
                    src={movie.posterUrl}
                    alt={`${movie.title} poster`}
                    className="absolute inset-0 h-full w-full object-cover"
                    onLoad={() => {
                      console.log("POSTER LOADED");
                      setPosterError(false);
                    }}
                    onError={() => {
                      console.error("POSTER FAILED");
                      setPosterError(true);
                    }}
                  />
                )}

                {/* POSTER LOADING */}

                {posterLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-950 via-red-950/50 to-purple-950">

                    <div className="px-6 text-center">

                      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5 text-5xl shadow-2xl">
                        🎬
                      </div>

                      <h3 className="mt-6 text-2xl font-bold">
                        Creating your poster
                      </h3>

                      <p className="mt-2 text-sm text-zinc-400">
                        AI is designing the cinematic artwork...
                      </p>

                      <div className="mx-auto mt-6 h-1.5 w-52 overflow-hidden rounded-full bg-white/10">

                        <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500" />

                      </div>

                    </div>

                  </div>
                )}

                {/* POSTER ERROR */}

                {!posterLoading &&
                  (!movie.posterUrl ||
                    posterError) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-950 via-red-950/30 to-purple-950">

                      <div className="text-center">

                        <ImageIcon className="mx-auto h-16 w-16 text-zinc-700" />

                        <p className="mt-4 font-semibold text-zinc-400">
                          Poster unavailable
                        </p>

                        <p className="mt-2 text-sm text-zinc-600">
                          Movie information is still available.
                        </p>

                      </div>

                    </div>
                  )}

                {/* CINEMATIC OVERLAYS */}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5" />

                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

                {/* MOVIE INFO */}

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">

                  <div className="mb-4 flex flex-wrap gap-2">

                    <span className="rounded-full bg-yellow-400 px-3 py-1 text-sm font-black text-black shadow-lg">
                      ⭐ {movie.rating}
                    </span>

                    <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1 text-sm font-semibold backdrop-blur-xl">
                      {movie.genre}
                    </span>

                    {movie.year && (
                      <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1 text-sm font-semibold backdrop-blur-xl">
                        {movie.year}
                      </span>
                    )}

                  </div>

                  <h2 className="max-w-5xl text-4xl font-black tracking-[-0.04em] md:text-7xl">
                    {movie.title}
                  </h2>

                  {movie.tagline && (
                    <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300 md:text-xl">
                      {movie.tagline}
                    </p>
                  )}

                </div>

              </div>

            </div>

            {/* =================================================
                STATS
            ================================================= */}

            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">

              <StatCard
                icon={<Star />}
                label="Rating"
                value={movie.rating}
              />

              <StatCard
                icon={<Film />}
                label="Genre"
                value={movie.genre}
              />

              <StatCard
                icon={<Clock />}
                label="Runtime"
                value={movie.runtime}
              />

              <StatCard
                icon={<User />}
                label="Director"
                value={movie.director || "AI Studio"}
              />

            </div>

            {/* =================================================
                STORY + CAST
            ================================================= */}

            <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">

              {/* STORY */}

              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl md:p-8">

                <div className="mb-6 flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                    📖
                  </div>

                  <div>

                    <h3 className="text-2xl font-bold">
                      Story
                    </h3>

                    <p className="text-xs uppercase tracking-wider text-zinc-600">
                      AI-generated synopsis
                    </p>

                  </div>

                </div>

                <p className="text-[15px] leading-8 text-zinc-300">
                  {movie.story}
                </p>

              </div>

              {/* CAST */}

              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl md:p-8">

                <div className="mb-6 flex items-center justify-between">

                  <h3 className="text-2xl font-bold">
                    Cast
                  </h3>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-500">
                    {movie.cast?.length || 0} members
                  </span>

                </div>

                <div className="space-y-3">

                  {movie.cast?.map(
                    (actor, index) => (
                      <div
                        key={index}
                        className="group rounded-2xl border border-white/[0.06] bg-black/30 p-4 transition hover:border-white/10 hover:bg-white/[0.05]"
                      >

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 text-xs font-bold text-zinc-400">
                            {index + 1}
                          </div>

                          <div className="min-w-0">

                            <p className="truncate font-bold text-white">
                              {typeof actor ===
                              "string"
                                ? actor
                                : actor.name}
                            </p>

                            {typeof actor !==
                              "string" &&
                              actor.role && (
                                <p className="mt-1 truncate text-xs text-zinc-500">
                                  {actor.role}
                                </p>
                              )}

                          </div>

                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>

            </div>

            {/* =================================================
                GENERATED POSTER
            ================================================= */}

            {movie.posterUrl && !posterError && (
              <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl md:p-8">

                <div className="mb-7 flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                    <ImageIcon className="h-5 w-5" />
                  </div>

                  <div>

                    <h3 className="text-2xl font-bold">
                      AI Generated Poster
                    </h3>

                    <p className="text-xs uppercase tracking-wider text-zinc-600">
                      Original cinematic artwork
                    </p>

                  </div>

                </div>

                <div className="flex justify-center">

                  <img
                    src={movie.posterUrl}
                    alt={`${movie.title} poster`}
                    className="w-full max-w-lg rounded-2xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.5)]"
                  />

                </div>

              </div>
            )}

            {/* =================================================
                POSTER PROMPT
            ================================================= */}

            <div className="mt-4 rounded-3xl border border-purple-500/15 bg-purple-950/10 p-7 backdrop-blur-xl md:p-8">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  🎨
                </div>

                <h3 className="text-xl font-bold">
                  AI Poster Prompt
                </h3>

              </div>

              <p className="mt-5 leading-8 text-zinc-400">
                {movie.posterPrompt}
              </p>

            </div>

            {/* =================================================
                TRAILER
            ================================================= */}

            {trailer && (
              <div className="mt-4 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 to-fuchsia-950/10 p-7 backdrop-blur-xl md:p-8">

                <div className="mb-8 flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                    <Play className="h-5 w-5" />
                  </div>

                  <div>

                    <h3 className="text-2xl font-bold">
                      AI Trailer
                    </h3>

                    <p className="text-xs uppercase tracking-wider text-purple-300/50">
                      Trailer concept
                    </p>

                  </div>

                </div>

                {trailer.voiceOver && (
                  <div className="mb-8">

                    <h4 className="mb-3 text-lg font-bold">
                      🎙️ Voice Over
                    </h4>

                    <div className="rounded-2xl border border-white/[0.06] bg-black/30 p-5">
                      <p className="leading-8 text-zinc-300">
                        {trailer.voiceOver}
                      </p>
                    </div>

                  </div>
                )}

                {trailer.music && (
                  <div className="mb-8">

                    <h4 className="mb-3 text-lg font-bold">
                      🎵 Background Music
                    </h4>

                    <div className="rounded-2xl border border-white/[0.06] bg-black/30 p-5">
                      <p className="text-zinc-400">
                        {trailer.music}
                      </p>
                    </div>

                  </div>
                )}

                {trailer.scenes &&
                  trailer.scenes.length > 0 && (
                    <div>

                      <h4 className="mb-4 text-lg font-bold">
                        🎬 Trailer Scenes
                      </h4>

                      <div className="space-y-3">

                        {trailer.scenes.map(
                          (scene, index) => (
                            <div
                              key={index}
                              className="rounded-2xl border border-white/[0.06] bg-black/30 p-5"
                            >

                              <div className="mb-2 flex items-center gap-2">

                                <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-400">
                                  Scene {index + 1}
                                </span>

                              </div>

                              <p className="leading-7 text-zinc-300">
                                {scene}
                              </p>

                            </div>
                          )
                        )}

                      </div>

                    </div>
                  )}

              </div>
            )}

          </section>
        )}

        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="mt-20 border-t border-white/[0.06] pt-8 text-center">

          <div className="flex items-center justify-center gap-2 text-sm text-zinc-600">

            <Clapperboard className="h-4 w-4" />

            <span>
              StreamFlix AI • Built with ❤️ by
              Akash Rajpoot
            </span>

          </div>

        </footer>

      </div>
    </main>
  );
}

// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition hover:bg-white/[0.055]">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
          {icon}
        </div>

        <div className="min-w-0">

          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-600">
            {label}
          </p>

          <p className="mt-1 truncate font-bold text-white">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}