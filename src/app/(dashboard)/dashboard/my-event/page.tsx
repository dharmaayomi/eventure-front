import MyEventPage from "@/features/(dashboard)/my-event";
import { auth } from "@/lib/auth";
import { EventWithTransaction } from "@/types/event";
import { redirect } from "next/navigation";
import React, { FC } from "react";

interface MyEventProps {
  event: EventWithTransaction;
}

const MyEvent: FC<MyEventProps> = async ({ event }) => {
  const session = await auth();

  if (!!!session) return redirect("/");
  if (session.user.role !== "ADMIN") return redirect("/dashboard/profile");
  return (
    <div>
      <MyEventPage event={event} />
    </div>
  );
};

export default MyEvent;
