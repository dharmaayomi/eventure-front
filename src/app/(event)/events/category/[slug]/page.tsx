import React from "react";

const EventCategory = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  return <div>CategoryPage</div>;
};

export default EventCategory;
