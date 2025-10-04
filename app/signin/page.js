"use client";

import React, { useState } from "react";
import Link from "next/link";
import GitHubButton from "@/components/GitHubButton";
import { signIn } from "next-auth/react";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Username:", username, "Password:", password, "Email:", email);
    // Add API call / auth logic here
  };

  return (
    <div className="mt-8 min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-md bg-gray-950/90 border border-green-400/30 shadow-lg shadow-green-900/40 rounded-2xl p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
          Sign In
        </h2>

        {/* Normal login form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              className="w-full rounded-lg bg-gray-900 border border-green-400/40 text-white px-3 py-2 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
              className="w-full rounded-lg bg-gray-900 border border-green-400/40 text-white px-3 py-2 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full rounded-lg bg-gray-900 border border-green-400/40 text-white px-3 py-2 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-2 rounded-lg border border-green-400/40 text-white bg-gray-900 hover:bg-gray-800 hover:border-green-400 hover:shadow-[0_0_10px_rgba(34,197,94,0.6)] hover:scale-105 transition-all duration-200 font-medium cursor-pointer"
          >
            Sign In
          </button>

          <div className="text-center mt-3 text-sm text-gray-400">
            New here?{" "}
            <Link href="/signup" className="text-green-400 hover:underline">
              Create an account
            </Link>
          </div>
        </form>

        {/* Social login */}
        <div className="mt-6">
          <div className="flex items-center">
            <hr className="flex-1 border-green-400/30" />
            <span className="px-3 text-gray-500 text-sm">or</span>
            <hr className="flex-1 border-green-400/30" />
          </div>

          <div className="flex justify-center mt-4 hover:cursor-pointer">
            <GitHubButton onClick={() => signIn("github", { callbackUrl: "/" })} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
