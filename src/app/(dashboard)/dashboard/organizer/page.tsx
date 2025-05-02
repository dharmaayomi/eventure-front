import OrganizerPage from "@/features/(dashboard)/organizer";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const Organizer = async () => {
  const session = await auth();

  if (!!!session) return redirect("/");

  if (session.user.role !== "ADMIN") return redirect("/dashboard/profile");
  return (
    <div>
      <OrganizerPage />
    </div>
  );
};

export default Organizer;
