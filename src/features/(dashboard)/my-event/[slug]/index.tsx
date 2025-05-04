"use client";

import useGetEventOrganizerBySlug from "@/hooks/api/event/useGetEventOrganizerBySlug";
import { FC, useState } from "react";
import ThumbnailCard from "./_components/ThumbnailCard";
import { log } from "util";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SlugPage from "./_components/SlugPage";

interface EventDetailOrganizerPageProps {
  slug: string;
}
const EventDetailOrganizerPage: FC<EventDetailOrganizerPageProps> = ({
  slug,
}) => {
  const { data: event, isPending } = useGetEventOrganizerBySlug(slug);
  if (isPending) {
    return <h1 className="text-center">Loading</h1>;
  }
  if (!event) {
    return <h1 className="text-center">No Data</h1>;
  }
  //   console.log(event);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <SlugPage event={event} />
    </div>
  );
};

export default EventDetailOrganizerPage;
