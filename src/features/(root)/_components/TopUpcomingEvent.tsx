import React from "react";
import EventCard from "../event/EventCard";

const TopUpcomingEvent = () => {
  return (
    <section className="container mx-auto space-y-6">
      <h3 className="text-3xl font-black">Top Upcoming Events</h3>
      <EventCard />
    </section>
  );
};

export default TopUpcomingEvent;
