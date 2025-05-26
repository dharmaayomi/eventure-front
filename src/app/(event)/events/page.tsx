import Discover from "@/app/(root)/discover/page";
import DiscoverPage from "@/features/(root)/discover";
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
