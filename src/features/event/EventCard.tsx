import { Event } from "@/types/event";
import { Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface EventCardProps {
  event: Event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  const rupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const price = event.tickets?.[0]?.price;

  return (
    <Link href={`/events/${event.slug}`}>
      <div className="group py-2 pl-2">
        <div className="w-[250px] rounded-md bg-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
          <div className="relative h-[150px] w-full overflow-hidden rounded-t-md">
            <Image
              src={event.thumbnail}
              alt="thumbnail"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="overflow-hidden object-cover transition-opacity duration-300 group-hover:opacity-90"
            />
          </div>
          <div className="p-4">
            <div>
              <div className="grid w-full items-center py-2">
                <div className="flex flex-col space-y-1.5">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {event.name.toUpperCase()}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-light text-gray-600">
                    <Calendar size={14} />
                    {new Date(event.startDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#024ee8]">
                    <Tag size={14} />
                    {price ? rupiah(price) : "Coming soon"}
                  </div>
                  <hr className="my-2 border-dashed border-gray-300" />
                  <div className="flex items-center gap-2">
                    {/* LOGO ORGANIZER */}
                    <div className="relative h-[30px] w-[30px] overflow-hidden rounded-t-md">
                      <Image
                        src={
                          event.organizer.profilePic
                            ? event.organizer.profilePic
                            : "/YGEnt.webp"
                        }
                        alt="organizer-logo"
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>

                    <p className="text-xs font-light text-gray-700">
                      {event.organizer.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
