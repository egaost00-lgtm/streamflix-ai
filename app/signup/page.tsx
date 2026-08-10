"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSignup() {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { error } = await signUp(email, password);

    if (error) {
      alert(error.message);
      return;
    }
router.push("/login?signup=success");
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold text-white text-center mb-2">
          StreamFlix AI
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Create your account
        </p>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-800 text-white"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-800 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-800 text-white"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-gray-800 text-white"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg text-white font-bold"
        >
          Create Account
        </button>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-red-500">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}