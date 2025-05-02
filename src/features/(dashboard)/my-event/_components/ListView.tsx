"use client";
import useGetEventByOrganizer from "@/hooks/api/event/useGetEventByOrganizer";
import ListViewDetail from "./ListViewDetail";

const ListView = () => {
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

  return events.length === 0 ? (
    <div>No Events</div>
  ) : (
    <ListViewDetail event={events} />
  );
};

export default ListView;
