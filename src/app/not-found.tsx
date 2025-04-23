import { potta_one, rubik } from "@/assets/fonts";
import { ExternalLinkIcon, Home, Undo2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <main className="bg-[#E9F5FE]">
      <div
        className={`container ${rubik.className} mx-auto min-h-svh flex-col items-center justify-center space-y-6 p-6 md:p-15`}
      >
        <h2
          className={` ${rubik.className} text-center text-7xl font-extrabold text-[#241F21]`}
        >
          Oops!
        </h2>
        <h3 className="text-center text-xl font-medium text-[#241F21]">
          Page Not Found
        </h3>
        <div className="flex items-center justify-center p-7">
          <Image
            src="/notFound.webp"
            alt="logo"
            width={500}
            height={213}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <Link
          className="pointer-events-auto text-xl font-light text-[#241F21] hover:text-[#505050] hover:underline"
          href="/"
        >
          <div className="flex items-center justify-center gap-1">
            <Undo2 size={26} />
            Back to Home
          </div>
        </Link>
      </div>
    </main>
  );
}
