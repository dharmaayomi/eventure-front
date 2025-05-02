import EventByCategory from "@/features/event/EventByCategory";
import React from "react";

const EventCategory = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  return (
    <main className="container mx-auto">
      <div className="mt-30">
        <EventByCategory slug={slug} />
      </div>
    </main>
  );
};

export default EventCategory;
