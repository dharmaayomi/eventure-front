import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import EventCard from "@/features/event/EventCard";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const LocationEvent = () => {
  const [selectedLocation, setSelectedLocation] = useState("Yogyakarta");

  return (
    <section className="container mx-auto space-y-6">
      <div className="flex gap-2 text-3xl font-bold">
        <h3>Popular in</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              aria-haspopup="menu"
              aria-expanded="false"
              className="flex cursor-pointer items-center gap-2 text-[#FF7F00]"
              data-state="closed"
            >
              {selectedLocation} <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select your location</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["Yogyakarta", "Jakarta", "Bandung", "Surabaya", "Semarang"].map(
              (location) => (
                <DropdownMenuCheckboxItem
                  key={location}
                  checked={selectedLocation === location}
                  onCheckedChange={() => setSelectedLocation(location)}
                >
                  {location}
                </DropdownMenuCheckboxItem>
              ),
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <EventCard />
    </section>
  );
};

export default LocationEvent;
