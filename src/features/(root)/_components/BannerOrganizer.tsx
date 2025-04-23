import Image from "next/image";
import React from "react";

const BannerOrganizer = () => {
  return (
    <section className="container mx-auto">
      <Image
        src="/mock-banner-1.webp"
        alt="logo"
        loading="lazy"
        width={500}
        height={213}
        className="h-[213px] w-full rounded-sm object-cover shadow-sm"
      />
    </section>
  );
};

export default BannerOrganizer;
