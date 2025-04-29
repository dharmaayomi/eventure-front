"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import EventByLocation from "@/features/event/EventByLocation";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const LocationEvent = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("JAKARTA");

  const handleSelectedLocation = (location: string) => {
    setSelectedLocation(location);
  };
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
            <DropdownMenuCheckboxItem
              onClick={() => handleSelectedLocation("YOGYAKARTA")}
            >
              Yogyakarta
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              onClick={() => handleSelectedLocation("JAKARTA")}
            >
              Jakarta
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              onClick={() => handleSelectedLocation("BANDUNG")}
            >
              Bandung
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              onClick={() => handleSelectedLocation("SURABAYA")}
            >
              Surabaya
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              onClick={() => handleSelectedLocation("SEMARANG")}
            >
              Semarang
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <EventByLocation slug={selectedLocation} />
    </section>
  );
};

export default LocationEvent;
