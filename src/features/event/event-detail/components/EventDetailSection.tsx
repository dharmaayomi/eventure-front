import { Event } from "@/types/event";
import Image from "next/image";
import { FC } from "react";
import FormTransaction from "./FormTransaction";

interface EventDetailSectionProps {
  event: Event;
}

const EventDetailSection: FC<EventDetailSectionProps> = ({ event }) => {
  return (
    <section className="relative overflow-hidden rounded-md bg-white shadow-md">
      <div className="relative h-56 w-full sm:h-64">
        <Image
          src={event.thumbnail}
          alt="event-image"
          width={200}
          height={200}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h1 className="mb-2 text-xl font-semibold text-indigo-600">
          {event.category.name}
        </h1>
        <p className="mb-1 text-sm text-gray-600">
          {new Date(event.startDate).toLocaleDateString()}
        </p>
        <p className="mb-1 text-sm text-gray-600">
          <span className="font-medium">{String(event.location)}</span>{" "}
        </p>
        <p className="mb-2 text-sm text-gray-600">
          <span className="font-medium">{event.organizer.name}</span>
        </p>
        <div className="prose prose-sm text-gray-700">{event.desc}</div>
      </div>
      <div className="border-t border-gray-200 p-4">
        <FormTransaction event={event} />
      </div>
    </section>
  );
};

export default EventDetailSection;
