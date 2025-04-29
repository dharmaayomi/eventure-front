import NavbarCreateEvent from "@/features/event/create-event/components/NavbarCreateEvent";
import React from "react";

const createEventLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavbarCreateEvent />
      {children}
    </div>
  );
};

export default createEventLayout;
