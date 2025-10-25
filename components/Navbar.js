"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-gray-950 border-b border-green-400/30 shadow-md">
      {/* Brand / Logo */}
      <div className="transition-transform hover:scale-105">
        <Link href="/">
          <h1 className="font-bold text-2xl tracking-wide cursor-pointer bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
            WillowWealth
          </h1>
        </Link>
      </div>

      {/* Nav Links */}
      <ul className="flex items-center space-x-3">
        <Link href="/">
          <li className="px-5 py-2 rounded-lg border border-green-400/40 text-white bg-gray-900/70 hover:bg-gray-800 hover:border-green-400 hover:shadow-[0_0_10px_rgba(34,197,94,0.6)] hover:scale-105 transition-all duration-200 font-medium cursor-pointer">
            Home
          </li>
        </Link>

        {!session && (
          <>
            <Link href="/login">
              <li className="px-5 py-2 rounded-lg border border-green-400/40 text-white bg-gray-900/70 hover:bg-gray-800 hover:border-green-400 hover:shadow-[0_0_10px_rgba(34,197,94,0.6)] hover:scale-105 transition-all duration-200 font-medium cursor-pointer">
                Log in
              </li>
            </Link>
            <Link href="/signin">
              <li className="px-5 py-2 rounded-lg border border-green-400/40 text-white bg-gray-900/70 hover:bg-gray-800 hover:border-green-400 hover:shadow-[0_0_10px_rgba(34,197,94,0.6)] hover:scale-105 transition-all duration-200 font-medium cursor-pointer">
                Sign in
              </li>
            </Link>
          </>
        )}

        {session && (
          <>
            <Link href="/Dashboard">
              <button className="px-5 py-2 rounded-lg border border-green-400/40 text-white bg-gray-900/70 hover:bg-gray-800 hover:border-green-400 hover:shadow-[0_0_10px_rgba(34,197,94,0.6)] hover:scale-105 transition-all duration-200 font-medium cursor-pointer">
                Dashboard
              </button>
            </Link>
            <div onClick={() => signOut({ callbackUrl: "/" })}>
              <button className="px-5 py-2 rounded-lg border border-green-400/40 text-white bg-gray-900/70 hover:bg-gray-800 hover:border-green-400 hover:shadow-[0_0_10px_rgba(34,197,94,0.6)] hover:scale-105 transition-all duration-200 font-medium cursor-pointer">
                Sign out
              </button>
            </div>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
