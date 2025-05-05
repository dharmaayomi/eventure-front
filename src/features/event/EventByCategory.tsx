"use client";

import useGetEvents from "@/hooks/api/event/useGetEvents";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import EventCard from "./EventCard";
import { CategoryName } from "@/types/event";

const EventByCategoryPage = () => {
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get("category");

  const category =
    categoryParams !== null ? (categoryParams as CategoryName) : undefined;

  const {
    data: events,
    isPending,
    isError,
  } = useGetEvents({
    category: category || undefined,
    take: 10,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Not found</div>;
  }

  return (
    <Suspense>
      <div className="container mx-auto py-8">
        <h1 className="mb-4 text-2xl font-bold">
          Result for {category?.toLowerCase()}
        </h1>
        {events.data.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.data.map((event) => (
              <EventCard event={event} />
            ))}
          </ul>
        ) : (
          <p className="mt-20">No event</p>
        )}
      </div>
    </Suspense>
  );
};

export default EventByCategoryPage;
