import React from "react";
import { EditFormEvents } from "./_components/EditFormEvents";

const EditEventPage = () => {
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 className="mb-5 text-2xl font-semibold text-gray-800 lg:mb-7 dark:text-white/90">
          Edit Event
        </h3>
        {/* btw ini masihhh mencobaaa */}
        <EditFormEvents />
      </div>
    </div>
  );
};

export default EditEventPage;
