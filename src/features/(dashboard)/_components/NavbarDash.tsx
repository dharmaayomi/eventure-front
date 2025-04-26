import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              onClick={toggleSidebar}
              type="button"
              className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none sm:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="h-6 w-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                />
              </svg>
            </button>
            <Link href="/" className="ms-2 flex md:me-24">
              <Image
                src="/eventureLogo.webp"
                alt="logo"
                width={180}
                height={100}
                loading="lazy"
                style={{ objectFit: "contain" }}
              />
            </Link>
          </div>
          <div className="flex items-center">
            <div className="ms-3 flex items-center">
              <div>
                <button
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="user"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
