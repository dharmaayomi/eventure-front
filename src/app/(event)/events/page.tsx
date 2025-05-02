import SearchEventPage from "@/features/event/search/SearchEventPage";
import React, { Suspense } from "react";

const EventPage = () => {
  return (
    <main className="container mx-auto">
      <div className="mt-30">
        <Suspense>
          <SearchEventPage />
        </Suspense>
      </div>
    </main>
  );
};

export default EventPage;
