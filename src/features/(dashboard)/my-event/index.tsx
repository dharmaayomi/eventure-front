import { Button } from "@/components/ui/button";
import { EventsByOrganizer } from "./_components/EventsByOrganizer";
import Link from "next/link";

const MyEventPage = () => {
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div>
          <EventsByOrganizer />
        </div>
      </div>
    </div>
  );
};

export default MyEventPage;
