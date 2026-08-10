import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white">

      <aside className="w-72 border-r border-white/10 bg-zinc-950 p-6">

        <h1 className="mb-10 text-3xl font-bold text-red-500">
          StreamFlix AI
        </h1>

        <nav className="space-y-3">

          <Link
            href="/admin"
            className="block rounded-lg px-4 py-3 hover:bg-zinc-800"
          >
            🏠 Dashboard
          </Link>

          <Link
            href="/admin/movies"
            className="block rounded-lg px-4 py-3 hover:bg-zinc-800"
          >
            🎬 Movies
          </Link>

          <Link
            href="/admin/add-movie"
            className="block rounded-lg px-4 py-3 hover:bg-zinc-800"
          >
            ➕ Add Movie
          </Link>

          <Link
            href="/admin/users"
            className="block rounded-lg px-4 py-3 hover:bg-zinc-800"
          >
            👥 Users
          </Link>

          <Link
            href="/admin/analytics"
            className="block rounded-lg px-4 py-3 hover:bg-zinc-800"
          >
            📊 Analytics
          </Link>

          <Link
            href="/admin/settings"
            className="block rounded-lg px-4 py-3 hover:bg-zinc-800"
          >
            ⚙ Settings
          </Link>

        </nav>

      </aside>

      <main className="flex-1 p-10">
        {children}
      </main>

    </div>
  );
}