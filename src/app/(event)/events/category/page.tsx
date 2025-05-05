import EventByCategoryPage from "@/features/event/EventByCategory";
import { Suspense } from "react";

const EventCategory = () => {
  return (
    <main className="container mx-auto">
      <div className="mt-30">
        <Suspense>
          <EventByCategoryPage />
        </Suspense>
      </div>
    </main>
  );
};

export default EventCategory;
