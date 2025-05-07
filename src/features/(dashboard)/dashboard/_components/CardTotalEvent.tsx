"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import useGetTransactionByOrganizer from "@/hooks/api/organizer/useGetTransactionByOrganizer";
import Link from "next/link";
import { Trophy, Calendar, Star, ChevronRight, Award } from "lucide-react";
import useGetEventByOrganizer from "@/hooks/api/event/useGetEventByOrganizer";
import { useSession } from "next-auth/react";

const CardTotalEvent = () => {
  const { data: eventsData } = useGetEventByOrganizer();

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);

  const motivationalQuotes = [
    {
      quote: "Great events create unforgettable memories!",
      icon: <Star className="text-yellow-300" size={20} />,
    },
    {
      quote: "Your creativity makes events extraordinary!",
      icon: <Award className="text-yellow-300" size={20} />,
    },
    {
      quote: "Keep inspiring people with amazing experiences!",
      icon: <Star className="text-yellow-300" size={20} />,
    },
    {
      quote: "Each event is a chance to create something special!",
      icon: <Award className="text-yellow-300" size={20} />,
    },
    {
      quote: "You're building communities one event at a time!",
      icon: <Star className="text-yellow-300" size={20} />,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteVisible(false);

      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) =>
          prevIndex === motivationalQuotes.length - 1 ? 0 : prevIndex + 1,
        );
        setQuoteVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const eventCount = eventsData?.meta.total || 0;
  console.log("eventsData", eventsData);

  return (
    <div className="overflow-hidden rounded-2xl border shadow-md">
      <div className="bg-gradient-to-r from-blue-500 to-[#004DE8] p-6">
        <div className="mb-4 flex items-center justify-center space-x-3">
          <Trophy className="text-yellow-300" size={28} />
          <h3 className="text-center text-2xl font-bold text-white">
            Event Achievement
          </h3>
        </div>

        <div className="rounded-xl bg-white/10 p-6 shadow-inner backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-blue-600 opacity-20 blur-md"></div>
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white">
                <p className="text-5xl font-extrabold text-[#004DE8]">
                  {eventCount}
                </p>
              </div>
            </div>
          </div>

          <p className="mb-4 text-center text-white">
            You've successfully created{" "}
            <span className="font-bold">{eventCount}</span> events!
          </p>

          <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white"
              style={{
                width: `${Math.min(100, eventCount)}%`,
              }}
            ></div>
          </div>
          <p className="mb-5 text-right text-xs text-white/80">
            {Math.min(100, eventCount)}% to next milestone
          </p>

          <Link href="/dashboard/my-event" className="block">
            <Button className="flex w-full items-center justify-center bg-white text-[#004DE8] hover:bg-blue-50">
              <Calendar className="mr-2" size={16} />
              Create New Event
              <ChevronRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-[#004DE8] p-4">
        <div
          className={`flex items-center justify-center text-center transition-all duration-500 ${
            quoteVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {motivationalQuotes[currentQuoteIndex].icon}
          <p className="ml-2 font-medium text-white">
            {motivationalQuotes[currentQuoteIndex].quote}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardTotalEvent;
