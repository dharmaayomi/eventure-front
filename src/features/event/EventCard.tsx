import { CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, Tag } from "lucide-react";
import Image from "next/image";

const EventCard = () => {
  return (
    <div>
      <div className="w-[250px] rounded-sm border">
        <CardHeader>
          <div className="relative h-[150px] w-full overflow-hidden rounded-t-sm">
            <Image
              src="/bpConcert.webp"
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
                <h3 className="text-sm">Blackpink: World Tour 2025</h3>
                <div className="flex items-center gap-2 text-sm font-light">
                  {" "}
                  <Calendar size={16} /> 25 December 2025
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  {" "}
                  <Tag size={16} /> 3.000.000
                </div>
                <hr />
                <div className="flex items-center gap-2">
                  <Image
                    src="/YGEnt.webp"
                    alt="thumbnail"
                    height={25}
                    width={25}
                    className="rounded-full border object-cover"
                  />

                  <p className="text-sm font-light">YG Entertainment</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default EventCard;
