"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    try {
      const { error } = await signIn(email, password);

      if (error) {
        alert(error.message);
        return;
      }

      router.replace("/");
      router.refresh();
    } catch (e) {
      console.error(e);
      alert("Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-gray-900 p-10 rounded-xl w-full max-w-md shadow-2xl">

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          StreamFlix AI
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-800 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-gray-800 text-white"
        />

        <button
          onClick={handleSignIn}
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg text-white font-bold mb-4"
        >
          Sign In
        </button>

        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <Link href="/signup" className="text-red-500 hover:underline">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}