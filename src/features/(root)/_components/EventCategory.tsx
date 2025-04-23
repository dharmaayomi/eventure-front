import { Card } from "@/components/ui/card";
import { Music, Music2 } from "lucide-react";
import React from "react";

const EventCategory = () => {
  return (
    <section className="container mx-auto">
      <Card className="bg-[#fefefe] shadow-sm">
        <div className="mx-4 space-y-6">
          <h3 className="text-3xl font-bold text-[#083ca3]">
            Explore Events by <span className="text-[#FF7F00]">Category</span>
          </h3>
          <div className="grid grid-cols-6 items-center justify-center gap-2 text-center">
            <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-white p-2">
              <Music size={80} className="text-[#FF7F00]" />
            </div>
            <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-white p-2">
              category2
            </div>
            <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-white p-2">
              category3
            </div>
            <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-white p-2">
              category4
            </div>
            <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-white p-2">
              category5
            </div>
            <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-white p-2">
              category6
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default EventCategory;
