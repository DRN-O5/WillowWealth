import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="grid grid-cols-3 justify-center items-center py-4 px-6 bg-gray-800 text-white">
      <div>
        <h1 className="font-semibold text-xl">Expense Tracker</h1>
      </div>
    </nav>
  );
};

export default Navbar;
