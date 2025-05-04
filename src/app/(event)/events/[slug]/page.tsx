import EventDetailPage from "@/features/event/event-detail/EventDetailPage";

const EventDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  return (
    <main className="mx-auto mt-30 max-w-7xl px-4 sm:px-6">
      <div>
        <EventDetailPage slug={slug} />
      </div>
    </main>
  );
};

export default EventDetail;
