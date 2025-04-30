import EventDetailPage from "@/features/event/event-detail/EventDetailPage";

const EventDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  return (
    <main className="container mx-auto">
      <div className="mt-30">
        <EventDetailPage slug={slug} />;
      </div>
    </main>
  );
};

export default EventDetail;
