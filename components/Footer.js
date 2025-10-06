import React from "react";
import { useSession } from "next-auth/react";

const Footer = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className="bg-black text-white py-4 border-t border-green-400/30 shadow-lg shadow-green-900/40">
        <div className="container mx-auto text-center">
          <p className="text-lg">© 2025 WillowWealth. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
