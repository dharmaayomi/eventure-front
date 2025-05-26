// "use client";

// import useGetEvents from "@/hooks/api/event/useGetEvents";
// import { useSearchParams } from "next/navigation";
// import EventCard from "../EventCard";
// import { Suspense, useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const SearchEventPage = () => {
//   const searchParams = useSearchParams();
//   const search = searchParams.get("search");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const [debouncedSearch, setDebouncedSearch] = useState(search);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedSearch(search);
//     }, 1000);

//     return () => clearTimeout(handler);
//   }, [search]);
//   const take = 8;

//   const {
//     data: events,
//     isPending,
//     isError,
//   } = useGetEvents({
//     search: debouncedSearch || "",
//     take: take,
//     page: page,
//   });

//   console.log("ini search", events);

//   if (isPending) {
//     return <div>Loading...</div>;
//   }
//   if (isError) {
//     return <div>Not found</div>;
//   }

//   const handlePrev = () => {
//     setPage((prev) => Math.max(prev - 1, 1));
//   };

//   const handleNext = () => {
//     setPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   return (
//     <Suspense>
//       <div className="container mx-auto p-8">
//         <h1 className="mb-4 text-4xl font-bold">
//           Result for {debouncedSearch}
//         </h1>
//         {events.data.length > 0 ? (
//           <ul className="flex flex-wrap gap-6 pb-4">
//             {events.data.map((event) => (
//               <EventCard key={event.id} event={event} />
//             ))}
//           </ul>
//         ) : (
//           <p className="mt-20">No event</p>
//         )}
//       </div>
//       <div className="mt-8 flex justify-center gap-4">
//         <Button
//           onClick={handlePrev}
//           disabled={page === 1}
//           className="bg-[#073ca3] text-white hover:bg-[#062d82]"
//         >
//           <ChevronLeft className="mr-2 h-5 w-5" />
//           Prev
//         </Button>
//         <span className="flex items-center font-medium text-[#083ca3]">
//           Page {page} of {totalPages}
//         </span>
//         <Button
//           onClick={handleNext}
//           disabled={page === totalPages}
//           className="bg-[#073ca3] text-white hover:bg-[#062d82]"
//         >
//           Next
//           <ChevronRight className="ml-2 h-5 w-5" />
//         </Button>
//       </div>
//     </Suspense>
//   );
// };

// export default SearchEventPage;

// /*

// */
"use client";

import useGetEvents from "@/hooks/api/event/useGetEvents";
import { useSearchParams } from "next/navigation";
import EventCard from "../EventCard";
import { Suspense, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SearchEventPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(handler);
  }, [search]);

  const take = 8;

  const {
    data: events,
    isPending,
    isError,
  } = useGetEvents({
    search: debouncedSearch || "",
    take: take,
    page: page,
  });

  // Update total pages when events data changes
  useEffect(() => {
    if (events && events.meta && events.meta.take) {
      setTotalPages(events.meta.take);
    }
  }, [events]);

  if (isPending) {
    return (
      <div className="container mx-auto flex h-screen items-center justify-center">
        <div className="text-lg font-medium text-[#083ca3]">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto flex h-screen items-center justify-center">
        <div className="text-lg font-medium text-red-500">
          Error loading events. Please try again.
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto p-8 pt-32">
        <h1 className="mb-8 text-3xl font-bold text-[#083ca3]">
          {events.data.length > 0
            ? `Search results for: "${debouncedSearch}"`
            : `No results found for: "${debouncedSearch}"`}
        </h1>

        {events.data.length > 0 ? (
          <>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {events.data.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </ul>

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-4">
                <Button
                  onClick={handlePrev}
                  disabled={page === 1}
                  className="bg-[#073ca3] text-white hover:bg-[#062d82]"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Prev
                </Button>
                <span className="flex items-center font-medium text-[#083ca3]">
                  Page {page} of {totalPages}
                </span>
                <Button
                  onClick={handleNext}
                  disabled={page === totalPages}
                  className="bg-[#073ca3] text-white hover:bg-[#062d82]"
                >
                  Next
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-8 rounded-lg bg-gray-50 p-8 text-center">
            <p className="text-lg text-gray-600">
              No events match your search criteria. Try different keywords or
              explore our
              <Link
                href="/discover"
                className="ml-1 font-semibold text-[#083ca3] hover:underline"
              >
                discover page
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default SearchEventPage;
