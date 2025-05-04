import { Event } from "@/types/event";
import Image from "next/image";
import { FC } from "react";
import FormTransaction from "./FormTransaction";
import Markdown from "@/components/Markdown";

interface EventDetailSectionProps {
  event: Event;
}

const EventDetailSection: FC<EventDetailSectionProps> = ({ event }) => {
  return (
    <section className="py-10">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Event Detail */}
        <div className="space-y-4 md:w-2/3">
          <div className="relative h-64 w-full overflow-hidden rounded-lg">
            <Image
              src={event.thumbnail}
              alt="event-image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-indigo-700">
              {event.name.toUpperCase()}
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                {event.category}
              </span>
              <span>•</span>
              <span>{new Date(event.startDate).toLocaleDateString()}</span>
              <span>•</span>
              <span className="font-medium">{String(event.location)}</span>
            </div>

            <p className="text-sm text-gray-600">
              Organized by{" "}
              <span className="font-semibold">{event.organizer.name}</span>
            </p>

            <div className="prose prose-sm max-w-none text-gray-700">
              <Markdown content={event.desc} />
            </div>
          </div>
        </div>

        {/* Form Transaction */}
        <div className="md:w-1/3">
          <FormTransaction event={event} />
        </div>
      </div>
    </section>
  );
};

export default EventDetailSection;
