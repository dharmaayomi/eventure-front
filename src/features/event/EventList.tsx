"use client";

import useGetEvents from "@/hooks/api/event/useGetEvents";
import EventCard from "./EventCard";

const EventList = () => {
  const {
    data: eventsResponse,
    isPending,
    error,
  } = useGetEvents({
    take: 6,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;

  const events = eventsResponse?.data ?? [];

  if (events.length === 0) {
    return <div>No Events</div>;
  }

  return (
    <div className="no-scrollbar overflow-x-auto">
      <div className="flex flex-row">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
