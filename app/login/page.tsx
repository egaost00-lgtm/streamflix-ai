export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-10 rounded-xl w-96 shadow-2xl">

        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          StreamFlix AI
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded bg-gray-800 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 rounded bg-gray-800 text-white"
        />

        <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg text-white font-bold">
          Sign In
        </button>

      </div>
    </div>
  );
}