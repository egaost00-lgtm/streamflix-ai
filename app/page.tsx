"use client";

import Footer from "./components/Footer";
import Top10Today from "./components/Top10Today";
import ContinueWatching from "./components/ContinueWatching";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieRow from "./components/MovieRow";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <Hero />
      <ContinueWatching />
 <Top10Today /> 
      <MovieRow
        title="🔥 Trending Now"
        search={search}
        category="trending"
      />

      <MovieRow
        title="⭐ Top Rated"
        search={search}
        category="top-rated"
      />

      <MovieRow
        title="🎬 Popular"
        search={search}
        category="popular"
      />

      <MovieRow
        title="🚀 Sci-Fi"
        search={search}
        category="sci-fi"
      />

      <MovieRow
        title="😂 Comedy"
        search={search}
        category="comedy"
      />

      <MovieRow
        title="❤️ AI Picks For You"
        search={search}
        category="trending"
      />
      {/* <Footer /> */}
    </main>
  );
}