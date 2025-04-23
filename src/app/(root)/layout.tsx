import React from "react";
import Footer from "../../features/_components/Footer";
import Navbar from "../../features/_components/Navbar";

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
