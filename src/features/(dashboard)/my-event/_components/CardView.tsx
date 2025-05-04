"use client";
import useGetEventByOrganizer from "@/hooks/api/event/useGetEventByOrganizer";
import CardViewDetail from "./CardViewDetail";
import PaginationSection from "@/components/PaginationSection";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
const CardView = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const {
    data: eventsResponse,
    isPending,
    error,
  } = useGetEventByOrganizer({
    take: 6,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;

  const events = eventsResponse?.data ?? [];

  if (events.length === 0) {
    return <div>No Events</div>;
  }
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedEvents = events.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(events.length / itemsPerPage);

  const onChangePage = (pageNumber: number) => {
    setPage(pageNumber);
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-4 md:justify-start">
        {paginatedEvents.map((event) => (
          <CardViewDetail key={event.id} event={event} />
        ))}
      </div>
      <div className="pt-7">
        {totalPages > 1 && (
          <PaginationSection
            page={page}
            total={events.length}
            take={itemsPerPage}
            onChangePage={onChangePage}
          />
        )}
      </div>
    </div>
  );
};

export default CardView;
