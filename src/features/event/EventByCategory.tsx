"use client";

import useGetEventsCategory from "@/hooks/api/event/useGetEventsCategory";
import { FC } from "react";
import EventCard from "./EventCard";

interface EventByCategoryProps {
  slug: string;
}

const EventByCategory: FC<EventByCategoryProps> = ({ slug }) => {
  const { data: eventsResponse, isPending, error } = useGetEventsCategory(slug);

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

export default EventByCategory;
