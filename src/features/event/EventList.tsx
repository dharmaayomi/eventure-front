"use client";

import useGetEvents from "@/hooks/api/event/useGetEvents";
import EventCard from "./EventCard";

const EventList = () => {
  const { data: eventsResponse, isPending, error } = useGetEvents();

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;

  const events = eventsResponse?.data ?? [];

  if (events.length === 0) {
    return <div>No Events</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
