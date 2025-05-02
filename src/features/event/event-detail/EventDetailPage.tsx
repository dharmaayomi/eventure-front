"use client";

import useGetEvent from "@/hooks/api/event/useGetEvent";
import { FC } from "react";
import EventDetailSection from "./components/EventDetailSection";
import FormTransaction from "./components/FormTransaction";

interface EventDetailPageProps {
  slug: string;
}

const EventDetailPage: FC<EventDetailPageProps> = ({ slug }) => {
  const { data: event, isPending, error } = useGetEvent(slug);
  console.log(event);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;
  if (!event) return <div>No data</div>;

  return (
    <>
      <EventDetailSection event={event} />
    </>
  );
};

export default EventDetailPage;
