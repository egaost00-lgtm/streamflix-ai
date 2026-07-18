"use client";

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
<MovieRow title="🔥 Trending Now" search={search} />
<MovieRow title="⭐ Top Rated" search={search} />
<MovieRow title="🚀 Sci-Fi" search={search} />
<MovieRow title="😂 Comedy" search={search} />
<MovieRow title="❤️ AI Picks For You" search={search} />
    </main>
  );
}