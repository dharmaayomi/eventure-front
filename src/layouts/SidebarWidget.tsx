import React from "react";
import Link from "next/link";

export default function SidebarWidget() {
  return (
    <div className="mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]">
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        🎉 Welcome to Eventure!
      </h3>
      <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
        Your ultimate event management platform to plan, manage, and grow events
        seamlessly.
      </p>
      <Link
        href="/about"
        className="bg-brand-500 hover:bg-brand-600 flex items-center justify-center rounded-lg p-3 text-xs font-bold text-[#004DE8]"
      >
        Empowering Every Event
      </Link>
    </div>
  );
}
