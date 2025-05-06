import OrganizerDetailPage from "@/features/event/organizer";

const Organizer = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  return (
    <div className="container mx-auto mt-20 p-8">
      <OrganizerDetailPage slug={slug} />
    </div>
  );
};

export default Organizer;
