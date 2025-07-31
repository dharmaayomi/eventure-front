"use client";

import useGetEvents from "@/hooks/api/event/useGetEvents";
import EventCard from "./EventCard";

const EventListRecommended = () => {
  const {
    data: eventsResponse,
    isPending,
    error,
  } = useGetEvents({
    take: 6,
    sortBy: "totalTransactions",
    sortOrder: "desc",
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>No Data Found!</div>;

  const events = eventsResponse?.data ?? [];

  if (events.length === 0) {
    return <div>No Events</div>;
  }

  return (
    <div className="no-scrollbar overflow-x-auto">
      <div className="flex flex-row gap-6 pb-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventListRecommended;
