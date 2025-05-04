"use client";

import { EventWithTransaction } from "@/types/event";
import Image from "next/image";
import { FC, useState } from "react";
import StatEvent from "./StatEvent";

interface ThumbnailCardProps {
  event: EventWithTransaction;
}

const ThumbnailCard: FC<ThumbnailCardProps> = ({ event }) => {
  console.log("ini isi event", event);
  const [activeView, setActiveView] = useState<"transactions" | "attendees">(
    "transactions",
  );
  return (
    <div className="items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="space-y-4">
        <div className="relative h-80 w-full overflow-hidden rounded-2xl px-6 py-12 text-white">
          {/* Gambar latar belakang */}
          <div
            className="absolute inset-0 z-0 h-80"
            style={{
              backgroundImage: `url(${event.thumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Overlay hitam */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/60 to-transparent" />

          {/* Konten teks di bawah */}
          <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-end">
            <div className="px-1">
              <h1 className="mb-2 text-2xl leading-tight font-bold break-words md:text-4xl lg:text-5xl">
                {event.name}
              </h1>
            </div>
          </div>
        </div>

        {/* total total */}
        <StatEvent key={event.slug} slug={event.slug} />

        {/* tab switch */}
        <div className="mb-8 w-full rounded-lg bg-white shadow-sm">
          <div
            className="relative flex w-full items-center justify-between rounded-lg bg-gray-100 p-1"
            role="tablist"
          >
            {/* Slider background */}
            <div
              className={`absolute top-1 ${
                activeView === "attendees" ? "left-1/2" : "left-1"
              } h-[calc(100%-0.5rem)] w-[calc(50%-0.25rem)] rounded-md bg-[#004DE8] transition-all duration-300 ease-in-out`}
            />

            {/* Transactions tab */}
            <button
              onClick={() => setActiveView("transactions")}
              role="tab"
              className={`z-10 w-1/2 py-3 text-center text-sm font-semibold transition-colors duration-300 ${
                activeView === "transactions"
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Transactions List
            </button>

            {/* Attendees tab */}
            <button
              onClick={() => setActiveView("attendees")}
              role="tab"
              className={`z-10 w-1/2 py-3 text-center text-sm font-semibold transition-colors duration-300 ${
                activeView === "attendees"
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Attendees View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailCard;
