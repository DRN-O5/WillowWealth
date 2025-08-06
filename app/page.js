import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-[70vh]">
      <h1 className="text-7xl font-bold">Welcome to Spendwise</h1>
      <p className="mt-4 text-lg">Your one-stop solution for managing expenses.</p>
      <Link href="/register"><button className="mt-8 px-8 py-4 bg-gray-800 text-white rounded-full font-medium text-2xl hover:bg-gray-900 transition duration-200">Get Started</button></Link>
    </div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <h2 className="text-5xl font-bold">Get your spendings right!</h2>
      <p className="mt-4 text-lg">Join us to make the most of your money.</p>
    </div>
    </>
  );
}
