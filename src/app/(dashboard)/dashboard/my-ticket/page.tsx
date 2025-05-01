import MyTicketPage from "@/features/(dashboard)/my-ticket";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const MyTicket = async () => {
  const session = await auth();

  if (!!!session) return redirect("/");

  return (
    <div>
      <MyTicketPage />
    </div>
  );
};

export default MyTicket;
