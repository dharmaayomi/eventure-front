import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import EventCard from "../event/EventCard";

const LocationEvent = () => {
  return (
    <section className="container mx-auto space-y-6">
      <div className="flex gap-2 text-3xl font-bold">
        <h3>Popular in</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 text-[#FF7F00]">
              Yogyakarta <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select your location </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem>Yogyakarta</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Jakarta</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Bandung</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Surabaya</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Semarang</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <EventCard />
    </section>
  );
};

export default LocationEvent;
