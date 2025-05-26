"use client";
import PaginationSection from "@/components/PaginationSection";
import { Input } from "@/components/ui/input";
import useGetEventByOrganizer from "@/hooks/api/event/useGetEventByOrganizer";
import { Event } from "@/types/event";
import { Loader } from "lucide-react";
import Image from "next/image";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";
import CardViewDetail from "./CardViewDetail";

const CardView = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debouncedSearch] = useDebounceValue(search, 500);

  const {
    data: events,
    isPending,
    error,
  } = useGetEventByOrganizer({
    take: 6,
    page: page,
    sortBy: "createdAt",
    sortOrder: "desc",
    search: debouncedSearch,
  });

  console.log("iniiiiiiii events", events);
  console.log("ini error", error);

  const onChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <div className="space-y-4">
      <Input
        className="mx-auto mt-10 w-full"
        placeholder="Search...."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {isPending && (
        <div className="flex h-[30vh] items-center justify-center">
          <Loader />
        </div>
      )}

      {error && (
        <div className="flex h-[30vh] items-center justify-center">
          <h2>Something went wrong!</h2>
        </div>
      )}

      {!isPending && !error && !events?.data?.length && (
        <div className="mt-10 flex flex-col items-center justify-center space-y-3 py-10">
          <div className="space-y-3">
            <Image
              src="/noEvent.webp"
              alt="no event"
              width={150}
              height={150}
              style={{ objectFit: "contain" }}
              priority
            />
            <p className="text-center">No event found</p>
          </div>
        </div>
      )}

      {!isPending && !error && events?.data?.length > 0 && (
        <>
          <div>
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              {events.data.map((event: Event) => (
                <CardViewDetail key={event.id} event={event} />
              ))}
            </div>
          </div>
          <div className="pt-7">
            <PaginationSection
              page={events.meta.page}
              total={events.meta.total}
              take={events.meta.take}
              onChangePage={onChangePage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CardView;
