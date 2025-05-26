"use client";

import { Button } from "@/components/ui/button";
import EventCard from "@/features/event/EventCard";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
console.log("DiscoverPage rendered");

const DiscoverPage = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const take = 8;
  const {
    data: eventsResponse,
    isPending,
    error,
  } = useGetEvents({
    take: take,
    page: page,
  });

  useEffect(() => {
    if (eventsResponse?.meta?.total) {
      setTotalPages(Math.ceil(eventsResponse.meta.total / take));
    }
  }, [eventsResponse]);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;

  const events = eventsResponse?.data ?? [];

  if (events.length === 0) {
    return <div>No Events</div>;
  }

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  console.log(eventsResponse?.meta?.total, "Total Events");

  return (
    <div className="container mx-auto mt-30 p-8">
      <h1 className="mb-4 text-4xl font-bold text-[#083ca3]">
        Discover Events
      </h1>

      {isPending ? (
        <div>Loading events...</div>
      ) : events.length === 0 ? (
        <div>No events found.</div>
      ) : (
        <>
          <div className="flex flex-wrap gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-4">
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
        </>
      )}
    </div>
  );
};

export default DiscoverPage;
