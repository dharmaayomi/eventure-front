"use client";

import { Event } from "@/types/event";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { EventsByOrganizer } from "./_components/EventsByOrganizer";

interface MyEventPageProps {
  event: Event;
}

const MyEventPage: FC<MyEventPageProps> = ({ event }) => {
  const router = useRouter();
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div>
          {/* <Button
            onClick={() => router.push(`/dashboard/my-event/create-voucher`)}
          >
            Create Voucher
          </Button> */}
          <EventsByOrganizer event={event} />
        </div>
      </div>
    </div>
  );
};

export default MyEventPage;
