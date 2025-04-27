// "use client";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// const slides = [
//   { src: "/banner.webp", link: "/login" },
//   { src: "/banner1.webp", link: "/login" },
//   { src: "/banner2.webp", link: "/login" },
//   { src: "/banner3.webp", link: "/login" },
//   { src: "/banner4.webp", link: "/login" },
// ];

// export const CarouselSlider: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const nextSlide = () => {
//     setActiveIndex((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   const goToSlide = (index: number) => {
//     setActiveIndex(index);
//   };

//   // Autoplay every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 5000);

//     return () => clearInterval(interval); // Clear interval on unmount
//   }, []);

//   return (
//     <div className="relative w-full">
//       {/* Carousel wrapper */}
//       <div className="relative h-32 overflow-hidden rounded-lg shadow-md md:h-70">
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
//               index === activeIndex ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <Link href={slide.link} target="_blank" rel="noopener noreferrer">
//               <img
//                 src={slide.src}
//                 className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2 cursor-pointer"
//                 alt={`Slide ${index + 1}`}
//               />
//             </Link>
//           </div>
//         ))}
//       </div>

//       {/* Indicators */}
//       <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`h-3 w-3 rounded-full ${
//               activeIndex === index ? "bg-white" : "bg-white/50"
//             }`}
//             onClick={() => goToSlide(index)}
//             aria-label={`Slide ${index + 1}`}
//           />
//         ))}
//       </div>

//       {/* Prev Button */}
//       <button
//         onClick={prevSlide}
//         className="group absolute top-0 left-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
//       >
//         <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 hover:bg-white/50 focus:ring-4 focus:ring-white">
//           <svg
//             className="h-4 w-4 text-white"
//             fill="none"
//             viewBox="0 0 6 10"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M5 1 1 5l4 4"
//             />
//           </svg>
//           <span className="sr-only">Previous</span>
//         </span>
//       </button>

//       {/* Next Button */}
//       <button
//         onClick={nextSlide}
//         className="group absolute top-0 right-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
//       >
//         <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 hover:bg-white/50 focus:ring-4 focus:ring-white">
//           <svg
//             className="h-4 w-4 text-white"
//             fill="none"
//             viewBox="0 0 6 10"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="m1 9 4-4-4-4"
//             />
//           </svg>
//           <span className="sr-only">Next</span>
//         </span>
//       </button>
//     </div>
//   );
// };

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const slides = [
  { src: "/banner.webp", link: "/login" },
  { src: "/banner1.webp", link: "/login" },
  { src: "/banner2.webp", link: "/login" },
  { src: "/banner3.webp", link: "/login" },
  { src: "/banner4.webp", link: "/login" },
];

export const CarouselSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel wrapper */}
      <div className="relative h-30 overflow-hidden rounded-lg shadow-lg md:h-70">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Link href={slide.link} target="_blank" rel="noopener noreferrer">
              <img
                src={slide.src}
                className="absolute top-1/2 left-1/2 h-full w-full max-w-none -translate-x-1/2 -translate-y-1/2 cursor-pointer object-cover"
                alt={`Slide ${index + 1}`}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              activeIndex === index ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="group absolute top-0 left-0 z-30 flex h-full cursor-pointer items-center justify-center px-2 focus:outline-none sm:px-4"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 hover:bg-white/50 focus:ring-4 focus:ring-white sm:h-10 sm:w-10">
          <svg
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="group absolute top-0 right-0 z-30 flex h-full cursor-pointer items-center justify-center px-2 focus:outline-none sm:px-4"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 hover:bg-white/50 focus:ring-4 focus:ring-white sm:h-10 sm:w-10">
          <svg
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};
