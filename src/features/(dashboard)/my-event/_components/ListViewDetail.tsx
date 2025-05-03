import { cn } from "@/lib/utils";
import { Event, EventWithTransaction } from "@/types/event";
import { format } from "date-fns";
import { Edit, Eye, EyeIcon, Trash, User } from "lucide-react";
import { FC, useState } from "react";
import { getStatusStyle } from "./getStatusColor";
import Link from "next/link";
import PaginationSection from "@/components/PaginationSection";

interface ListViewDetailProps {
  event: EventWithTransaction[];
}
const ListViewDetail: FC<ListViewDetailProps> = ({ event }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedEvents = event.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(event.length / itemsPerPage);

  const onChangePage = (pageNumber: number) => {
    setPage(pageNumber);
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Event Name",
              "Start Date",
              "End Date",
              "Status",
              //   "Attendees",
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
          {paginatedEvents.map((event) => {
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
                {/* <td className="px-4 py-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {event.totalTransactions}
                  </div>
                </td> */}
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

      <div className="py-6">
        {totalPages > 1 && (
          <PaginationSection
            page={page}
            total={event.length}
            take={itemsPerPage}
            onChangePage={onChangePage}
          />
        )}
      </div>
    </div>
  );
};

export default ListViewDetail;
