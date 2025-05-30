import Footer from "@/features/(root)/_components/Footer";
import Navbar from "@/features/(root)/_components/Navbar";
import React from "react";

const transactionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default transactionLayout;
