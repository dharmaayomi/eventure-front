"use client";
import PaginationSection from "@/components/PaginationSection";
import { cn } from "@/lib/utils";
import { Event } from "@/types/event";
import { format } from "date-fns";
import { Edit, EyeIcon, Loader, Trash } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { getStatusStyle } from "./getStatusColor";
import useGetEventByOrganizer from "@/hooks/api/event/useGetEventByOrganizer";
import { Input } from "@/components/ui/input";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";
import Image from "next/image";

const ListView = () => {
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
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Event Name",
                  "Start Date",
                  "End Date",
                  "Status",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {events.data.map((event: Event) => {
                const status = getStatusStyle(event.isDeleted);

                return (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-normal">
                      <div className="flex items-start gap-3">
                        <img
                          src={event.thumbnail}
                          alt={event.name}
                          className="h-10 w-10 rounded-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3";
                          }}
                        />
                        <span className="max-w-xs text-sm font-medium break-words text-gray-900">
                          {event.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {format(event.startDate, "dd/MM/yyyy")}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {format(event.endDate, "dd/MM/yyyy")}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={cn(
                          "rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800",
                          status.className,
                        )}
                      >
                        {status.text}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex space-x-2">
                        <Link href={`/dashboard/my-event/${event.slug}/edit`}>
                          <button className="transform rounded p-1 transition hover:-translate-y-0.5 hover:scale-105">
                            <Edit className="h-4 w-4 text-gray-600 hover:text-blue-600" />
                          </button>
                        </Link>
                        <Link href={`/dashboard/my-event/${event.slug}`}>
                          <button className="transform rounded p-1 transition hover:-translate-y-0.5 hover:scale-105">
                            <EyeIcon
                              size={18}
                              className="text-gray-600 hover:text-blue-600"
                            />
                          </button>
                        </Link>
                        <Link href={`/dashboard/my-event/edit`}>
                          <button className="transform rounded p-1 transition hover:-translate-y-0.5 hover:scale-105">
                            <Trash size={16} className="text-red-600" />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="pt-7">
            <PaginationSection
              page={events.meta.page}
              total={events.meta.total}
              take={events.meta.take}
              onChangePage={onChangePage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListView;
