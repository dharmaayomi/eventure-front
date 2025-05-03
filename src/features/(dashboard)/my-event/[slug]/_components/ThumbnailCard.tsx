import { EventWithTransaction } from "@/types/event";
import Image from "next/image";
import { FC } from "react";

interface ThumbnailCardProps {
  event: EventWithTransaction;
}

const ThumbnailCard: FC<ThumbnailCardProps> = ({ event }) => {
  //   console.log("ini isi event", event);

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="h-24 w-24 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
        <Image
          width={96}
          height={96}
          src={event.thumbnail}
          alt={event?.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {event.category}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {event.location}
        </p>
      </div>
    </div>
  );
};

export default ThumbnailCard;
