"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    loadUser();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
<div className="mx-auto mb-8 max-w-7xl">
<Link
  href="/"
  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900 px-5 py-3 text-white transition hover:border-red-500 hover:bg-zinc-800"
>
   🏠 Home
</Link>
 </div>
      <div className="mx-auto max-w-7xl">

        {/* Profile Header */}
        <div className="mb-12 flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-zinc-900/70 p-8 backdrop-blur md:flex-row">

          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 text-5xl font-bold shadow-xl">
            {user?.email?.charAt(0).toUpperCase() || "A"}
          </div>

          <div className="flex-1">

            <h1 className="text-5xl font-bold">
              My Profile
            </h1>

            <p className="mt-3 text-lg text-gray-400">
              {user?.email || "Loading user..."}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">

              <span className="rounded-full bg-yellow-500 px-4 py-2 text-sm font-bold text-black">
                💎 Premium
              </span>

              <span className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold">
                🟢 Online
              </span>

            </div>

          </div>

        </div>

        {/* Dashboard Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <Link
            href="/my-list"
            className="rounded-2xl border border-white/10 bg-zinc-900 p-6 transition duration-300 hover:scale-105 hover:border-red-500 hover:bg-zinc-800"
          >
            <h2 className="text-2xl font-bold">
              ❤️ My List
            </h2>

            <p className="mt-3 text-gray-400">
              View your saved movies.
            </p>
          </Link>

          <Link
            href="/continue"
            className="rounded-2xl border border-white/10 bg-zinc-900 p-6 transition duration-300 hover:scale-105 hover:border-red-500 hover:bg-zinc-800"
          >
            <h2 className="text-2xl font-bold">
              ▶ Continue Watching
            </h2>

            <p className="mt-3 text-gray-400">
              Resume where you left off.
            </p>
          </Link>

          <Link
            href="/ai"
            className="rounded-2xl border border-white/10 bg-zinc-900 p-6 transition duration-300 hover:scale-105 hover:border-red-500 hover:bg-zinc-800"
          >
            <h2 className="text-2xl font-bold">
              🤖 AI Movies
            </h2>

            <p className="mt-3 text-gray-400">
              Explore AI-generated movies.
            </p>
          </Link>

          <Link
            href="/settings"
            className="rounded-2xl border border-white/10 bg-zinc-900 p-6 transition duration-300 hover:scale-105 hover:border-red-500 hover:bg-zinc-800"
          >
            <h2 className="text-2xl font-bold">
              ⚙️ Settings
            </h2>

            <p className="mt-3 text-gray-400">
              Manage your account preferences.
            </p>
          </Link>

        </div>

      </div>
    </main>
  );
}