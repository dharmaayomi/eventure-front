import EventDetailOrganizerPage from "@/features/(dashboard)/my-event/[slug]";
import React from "react";

const EventDetailOrganizer = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  return <EventDetailOrganizerPage slug={slug} />;
};

export default EventDetailOrganizer;
