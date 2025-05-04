import EventListRecommended from "@/features/event/EventListRecommended";

const RecommendedEvent = () => {
  return (
    <section className="container mx-auto space-y-6">
      <h3 className="text-3xl font-black">Recommended Events</h3>
      <EventListRecommended />
    </section>
  );
};

export default RecommendedEvent;
