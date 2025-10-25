"use client"; // Required for React state in Next.js 13+ app directory

import Link from "next/link";
import BenefitContainer from "@/components/BenefitContainer";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div>
        <div className="min-h-[75vh] bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white flex flex-col items-center justify-center p-4">
          <h1 className="text-5xl font-extrabold p-3 mb-4 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
            A Place to Begin your Expense Journey
          </h1>
          <p className="text-lg text-green-300 max-w-2xl text-center mb-8">
            Start tracking your expenses effortlessly and gain success.
          </p>
          <div>
            <Link href="/signin">
              <button className="bg-green-400 hover:bg-green-500 cursor-pointer transition duration-150 text-black font-bold py-2 px-4 rounded mr-3">
                Get Started
              </button>
            </Link>
          
          <Link href="/learn-more">
            <button className="bg-white hover:bg-gray-300 cursor-pointer transition duration-150 text-black font-bold py-2 px-4 rounded">
              Learn More
            </button>
          </Link>
          </div>
        </div>
        <div className="bg-black text-center p-4">
          <BenefitContainer />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
