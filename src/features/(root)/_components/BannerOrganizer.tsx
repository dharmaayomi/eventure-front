import Image from "next/image";
import React from "react";

const BannerOrganizer = () => {
  return (
    <section className="container mx-auto">
      <Image
        src="/banner4.webp"
        alt="logo"
        loading="lazy"
        width={1200}
        height={213}
        className="h-70 w-full rounded-sm object-cover shadow-sm"
      />
    </section>
  );
};

export default BannerOrganizer;
