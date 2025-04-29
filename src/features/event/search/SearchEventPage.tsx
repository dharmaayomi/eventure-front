"use client";

import useGetEvents from "@/hooks/api/event/useGetEvents";
import { useSearchParams } from "next/navigation";
import EventCard from "../EventCard";

const SearchEventPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const {
    data: events,
    isPending,
    isError,
  } = useGetEvents({
    search: search || "",
    take: 10,
  });

  console.log(events);

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-4 text-2xl font-bold">Result for {search}</h1>
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
  );
};

export default SearchEventPage;

/*

*/
