
"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(
        "Account created! Please check your email to verify your account."
      );
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 text-white">
        <h1 className="mb-2 text-3xl font-bold">Create Account</h1>
        <p className="mb-8 text-slate-400">
          Join SkillProof AI and showcase your skills.
        </p>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="mb-2 block">Full Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="mb-2 block">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="mb-2 block">Password</label>
            <input
              required
              type="password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
              placeholder="At least 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cyan-400 p-3 font-bold text-slate-950 hover:bg-cyan-300 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p className="mt-5 text-sm text-cyan-300">{message}</p>
        )}

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
