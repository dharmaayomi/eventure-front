// "use client";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import useGetTransactionByOrganizer from "@/hooks/api/organizer/useGetTransactionByOrganizer";
// import Link from "next/link";

// const CardTotalEvent = () => {
//   const {
//     data: transaction,
//     isLoading,
//     isError,
//   } = useGetTransactionByOrganizer();

//   const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
//   const [slideDirection, setSlideDirection] = useState("slide-left");

//   const motivationalQuotes = [
//     {
//       line1: "Great events create",
//       line2: "unforgettable memories!",
//     },
//     {
//       line1: "Your creativity makes",
//       line2: "events extraordinary!",
//     },
//     {
//       line1: "Keep inspiring people",
//       line2: "with amazing experiences!",
//     },
//     {
//       line1: "Each event is a chance",
//       line2: "to create something special!",
//     },
//     {
//       line1: "You're building communities",
//       line2: "one event at a time!",
//     },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSlideDirection("slide-out");

//       setTimeout(() => {
//         setCurrentQuoteIndex((prevIndex) =>
//           prevIndex === motivationalQuotes.length - 1 ? 0 : prevIndex + 1,
//         );
//         setSlideDirection("slide-in");
//       }, 500);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="overflow-hidden rounded-2xl border">
//       <div className="space-y-6 bg-white p-6">
//         <div className="space-y-3">
//           <h3 className="text-center text-3xl font-semibold text-gray-800">
//             🎉 <span className="text-[#004DE8]">Congratulations!</span>
//           </h3>
//           <p className="text-center text-gray-600">
//             You've successfully created{" "}
//             <span className="font-bold text-[#004DE8]">
//               {transaction?.data.totalTransactions || 0}
//             </span>{" "}
//             events!
//           </p>
//         </div>
//         <div className="flex h-40 items-center justify-center rounded-xl bg-blue-50 shadow-inner">
//           <p className="text-7xl font-extrabold text-[#004DE8]">
//             {transaction?.data.totalTransactions || 0}
//           </p>
//         </div>
//         <Link href="/dashboard/my-event" className="block">
//           <Button className="w-full bg-[#004DE8] transition-colors hover:bg-[#0040C0]">
//             Create New Event
//           </Button>
//         </Link>
//       </div>
//       <div className="flex h-24 items-center justify-center overflow-hidden bg-blue-600 p-6 text-center">
//         <div
//           className={`transition-all duration-500 ${
//             slideDirection === "slide-in"
//               ? "translate-x-0 opacity-100"
//               : slideDirection === "slide-out"
//                 ? "translate-x-full opacity-0"
//                 : ""
//           }`}
//         >
//           <p className="leading-tight font-medium text-white">
//             {motivationalQuotes[currentQuoteIndex].line1}
//             <br />
//             {motivationalQuotes[currentQuoteIndex].line2}{" "}
//             <span className="ml-1">🚀</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardTotalEvent;
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import useGetTransactionByOrganizer from "@/hooks/api/organizer/useGetTransactionByOrganizer";
import Link from "next/link";
import { Trophy, Calendar, Star, ChevronRight, Award } from "lucide-react";

const CardTotalEvent = () => {
  const {
    data: transaction,
    isLoading,
    isError,
  } = useGetTransactionByOrganizer();

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
      // Hide current quote
      setQuoteVisible(false);

      // Wait for fade out animation, then change quote
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) =>
          prevIndex === motivationalQuotes.length - 1 ? 0 : prevIndex + 1,
        );
        // Show new quote
        setQuoteVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const eventCount = transaction?.data.totalTransactions || 0;

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
              style={{ width: `${Math.min(100, eventCount * 2)}%` }}
            ></div>
          </div>
          <p className="mb-5 text-right text-xs text-white/80">
            {Math.min(100, eventCount * 2)}% to next milestone
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
