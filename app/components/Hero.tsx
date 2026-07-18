import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      <Image
        src="/hero/hero.jpg"
        alt="Hero"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Left gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent" />

      {/* Content */}
      <div className="absolute left-24 top-1/2 -translate-y-1/2 z-20 max-w-3xl">
        <h1 className="text-5xl lg:text-8xl font-black leading-none tracking-tight uppercase drop-shadow-2xl">
  <span className="block text-white">UNLIMITED</span>

  <span className="block bg-gradient-to-r from-red-500 via-red-400 to-red-700 bg-clip-text text-transparent">
    AI
  </span>

  <span className="block text-white">MOVIES</span>
</h1>

        <div className="flex items-center gap-6 mt-6 text-lg text-gray-300">
  <span>⭐ 9.8/10</span>
  <span>🎬 AI Original</span>
  <span>🕒 2h 15m</span>
  <span className="text-red-400">🔥 Trending</span>
</div>

<p className="mt-5 max-w-2xl text-xl text-gray-300 leading-8">
  Watch. Generate. Create.
  <br />
  Discover AI-powered cinema.
</p>

       <div className="flex items-center gap-4 mt-8">
  <Link
    href="/watch/1"
    className="bg-white text-black px-5 py-3 rounded-xl font-bold hover:bg-gray-300 transition whitespace-nowrap"
  >
    ▶ Play
  </Link>

  <button className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-5 py-3 rounded-xl font-bold hover:bg-white/20 transition whitespace-nowrap">
    ℹ More Info
  </button>

  <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-bold transition whitespace-nowrap">
    ❤️ Add to Watchlist
  </button>
</div>
      </div>
    </section>
  );
}