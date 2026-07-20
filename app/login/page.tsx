"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
  try {
    

    const { data, error } = await signIn(email, password);

  

    console.log(data);
    console.log(error);

    const { supabase } = await import("@/lib/supabase");

    

    const {
      data: { session },
    } = await supabase.auth.getSession();

    

    console.log("SESSION:", session);

   if (error) {
  alert(error.message);
  return;
}

router.replace("/");
router.refresh();
  } catch (e) {
    console.error(e);
    alert("ERROR");
  }
}
  async function handleSignUp() {
    const { error } = await signUp(email, password);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created successfully! Please check your email if confirmation is required.");
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-10 rounded-xl w-96 shadow-2xl">

        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          StreamFlix AI
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded bg-gray-800 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded bg-gray-800 text-white"
        />

        <button
          onClick={handleSignIn}
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg text-white font-bold mb-3"
        >
          Sign In
        </button>

        <button
          onClick={handleSignUp}
          className="w-full bg-gray-700 hover:bg-gray-600 py-3 rounded-lg text-white font-bold"
        >
          Create Account
        </button>

      </div>
    </div>
  );
}