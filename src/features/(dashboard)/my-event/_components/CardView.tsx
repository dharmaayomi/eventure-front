"use client";
import useGetEventByOrganizer from "@/hooks/api/event/useGetEventByOrganizer";
import CardViewDetail from "./CardViewDetail";

const CardView = () => {
  const {
    data: eventsResponse,
    isPending,
    error,
  } = useGetEventByOrganizer({
    take: 6,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;

  const events = eventsResponse?.data ?? [];

  if (events.length === 0) {
    return <div>No Events</div>;
  }

  //   console.log("event muncul", events);

  return (
    <div>
      <div className="flex flex-wrap justify-start gap-4 sm:px-4">
        {events.map((event) => (
          <CardViewDetail key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default CardView;
