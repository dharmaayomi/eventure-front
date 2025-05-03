"use client";
import { cn } from "@/lib/utils";
import { Event } from "@/types/event";
import { format } from "date-fns";
import { Edit, Eye, EyeIcon, Trash, User } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { getStatusStyle } from "./getStatusColor";
import Link from "next/link";

interface CardDetailProps {
  event: Event;
}

const CardViewDetail: FC<CardDetailProps> = ({ event }) => {
  const status = getStatusStyle(event.isDeleted);
  console.log("event muncul", event.totalTransactions);

  return (
    <section>
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md">
        <div className="w-69">
          <div className="relative h-[150px] w-full overflow-hidden rounded-t-xl">
            <Image
              src={event.thumbnail}
              alt={event.name}
              fill
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3";
              }}
            />
          </div>

          <div className="space-y-2 px-4 py-3">
            <h3 className="truncate text-sm font-semibold">{event.name}</h3>

            <p className="text-xs text-gray-500">
              {format(event.startDate, "MMM dd, yyyy")} –{" "}
              {format(event.endDate, "MMM dd, yyyy")}
            </p>

            <span
              className={cn(
                "inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium",
                status.className,
              )}
            >
              {status.text}
            </span>

            <hr />

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                {event.totalTransactions}
              </div>

              <div className="flex items-center gap-1">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardViewDetail;
