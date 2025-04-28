import EventList from "@/features/event/EventList";

const TopUpcomingEvent = () => {
  return (
    <section className="container mx-auto space-y-6">
      <h3 className="text-3xl font-black">Top Upcoming Events</h3>
      <EventList />
    </section>
  );
};

export default TopUpcomingEvent;
