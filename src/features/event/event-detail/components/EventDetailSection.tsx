import { Event } from "@/types/event";
import Image from "next/image";
import { FC } from "react";

interface EventDetailHeaderProps {
  event: Event;
}

const EventDetailSection: FC<EventDetailHeaderProps> = ({ event }) => {
  return (
    <section>
      <Image src={event.thumbnail} alt="event-image" width={200} height={200} />
      <h1>{event.category.name}</h1>
      <p>{new Date(event.startDate).toLocaleDateString()}</p>
      <p>{String(event.location)}</p>
      <p>{event.organizer.name}</p>
      <p>{event.desc}</p>
    </section>
  );
};

export default EventDetailSection;
