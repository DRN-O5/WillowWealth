"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";

const ProfileTab = () => {
  const { data: session } = useSession();

  const [username, setUsername] = useState(session?.user?.name || "");
  const [email] = useState(session?.user?.email || ""); // read-only
  const [mobile, setMobile] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, mobile }),
      });

      if (res.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Error updating profile");
      }
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  return (
    <div className="mx-auto bg-gray-950/90 border border-green-400/40 p-8 rounded-xl shadow-lg shadow-green-900/40 max-w-4xl text-white">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
        Profile
      </h1>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg bg-gray-900 border border-green-400/40 text-white px-3 py-2 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
            placeholder="Enter your username"
            required
          />
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full rounded-lg bg-gray-800 border border-green-400/20 text-gray-400 px-3 py-2 cursor-not-allowed"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Mobile Number
          </label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full rounded-lg bg-gray-900 border border-green-400/40 text-white px-3 py-2 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
            placeholder="Enter your mobile number"
            pattern="[0-9]{10}" // simple validation
            required
          />
        </div>

        {/* Save Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg border border-green-400/40 text-white bg-gray-900 hover:bg-gray-800 hover:border-green-400 hover:shadow-[0_0_10px_rgba(34,197,94,0.6)] hover:scale-105 transition-all duration-200 font-medium cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileTab;
