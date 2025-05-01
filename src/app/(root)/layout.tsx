import Footer from "@/features/(root)/_components/Footer";
import Navbar from "@/features/(root)/_components/Navbar";
import NextAuthProviders from "@/providers/NextAuthProviders";
import NextAuth from "next-auth";
import React from "react";

const rootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default rootLayout;
