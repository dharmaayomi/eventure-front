import EventCard from "@/features/event/EventCard";
import React from "react";

const RecommendedEvent = () => {
  return (
    <section className="container mx-auto space-y-6">
      <h3 className="text-3xl font-black">Recommended Events</h3>
      <EventCard />
    </section>
  );
};

export default RecommendedEvent;
