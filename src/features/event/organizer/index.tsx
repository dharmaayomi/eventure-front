"use client";

import { FC } from "react";
import OrganizerDetailSection from "./components/OrganizerDetail";
import useGetOrganizer from "@/hooks/api/organizer/useGetOrganizer";

interface OrganizerDetailPageProps {
  slug: string;
}

const OrganizerDetailPage: FC<OrganizerDetailPageProps> = ({ slug }) => {
  const { data: organizer, isPending, error } = useGetOrganizer(slug);
  console.log(organizer);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;
  if (!organizer) return <div>No data</div>;

  return <OrganizerDetailSection organizer={organizer} />;
};

export default OrganizerDetailPage;
