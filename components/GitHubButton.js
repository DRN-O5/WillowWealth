import React from "react";

export default function GitHubButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition duration-200 bg-white text-gray-700 font-medium"
    >
      {/* GitHub Logo */}
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.6 1.2 1.6 1.2 1 .1.8 1.9 2.8 1.9.6-1 .9-1.6 1.3-2-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17 6 18 6.3 18 6.3c.6 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.2 0 4.5-2.8 5.5-5.4 5.8.5.4.9 1.1 1.3 2v2.9c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.65 18.35.5 12 .5z" />
      </svg>
      <span>Continue with GitHub</span>
    </button>
  );
}
