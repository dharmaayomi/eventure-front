import { CardContent, CardHeader } from "@/components/ui/card";
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

  return (
    <Link href={`/events/${event.slug}`}>
      <div>
        <div className="w-[250px] rounded-sm border">
          <CardHeader>
            <div className="relative h-[150px] w-full overflow-hidden rounded-t-sm">
              <Image
                src={event.thumbnail}
                alt="thumbnail"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="overflow-hidden object-cover"
              ></Image>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <div className="grid w-full items-center py-2">
                <div className="flex flex-col space-y-1.5">
                  <h3 className="text-sm">{event.name}</h3>
                  <div className="flex items-center gap-2 text-sm font-light">
                    {" "}
                    <Calendar size={16} />
                    {new Date(event.startDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    {" "}
                    <Tag size={16} />
                    {rupiah(event.tickets?.[0]?.price)}
                  </div>
                  <hr />
                  <div className="flex items-center gap-2">
                    <Image
                      src={event.organizer.profilePic}
                      alt="thumbnail"
                      height={25}
                      width={25}
                      className="rounded-full border object-cover"
                    />
                    <p className="text-sm font-light">{event.organizer.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
