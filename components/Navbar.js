import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="grid grid-cols-3 justify-center items-center py-4 px-6 bg-gray-800 text-white">
      <div>
        <h1 className="font-semibold text-4xl">Spendwise</h1>
      </div>
      <div className="flex justify-center items-center">
        <ul className="flex space-x-12">
          <li>
            <Link
              href="/"
              className="text-lg p-3 rounded-3xl hover:bg-gray-900 transition duration-200 active:bg-gray-900"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-lg p-3 rounded-3xl hover:bg-gray-900 transition duration-200 active:bg-gray-900"
            >
              Sign In
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className="text-lg p-3 rounded-3xl hover:bg-gray-900 transition duration-200 active:bg-gray-900"
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
