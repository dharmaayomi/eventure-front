import MyEventPage from "@/features/(dashboard)/my-event";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const MyEvent = async () => {
  const session = await auth();

  if (!!!session) return redirect("/");
  return (
    <div>
      <MyEventPage />
    </div>
  );
};

export default MyEvent;
