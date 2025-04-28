"use client";

import useGetEventsLocation from "@/hooks/api/event/useGetEventsLocation";
import EventCard from "./EventCard";
import { FC } from "react";

interface EventByLocationProps {
  slug: string;
}

const EventByLocation: FC<EventByLocationProps> = ({ slug }) => {
  const { data: eventsResponse, isPending, error } = useGetEventsLocation(slug);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;

  const events = eventsResponse?.data ?? [];

  if (events.length === 0) {
    return <div>No events found in {slug}</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventByLocation;
