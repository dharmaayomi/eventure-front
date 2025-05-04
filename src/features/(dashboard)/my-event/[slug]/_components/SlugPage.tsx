import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { FC, useState } from "react";
import ThumbnailCard from "./ThumbnailCard";
import { EventWithTransaction } from "@/types/event";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface SlugPageProps {
  event: EventWithTransaction;
}

const SlugPage: FC<SlugPageProps> = ({ event }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const isEdit = pathname.includes("/edit");
  const slug = params.slug;
  const handleTabChange = (tab: string) => {
    if (tab === "edit") {
      router.push(`/dashboard/my-event/${slug}/edit`);
    } else {
      router.push(`/dashboard/my-event/${slug}`); // optional if already here
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/my-event")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to My Events
        </Button>

        {/* Tab Switcher */}
        <div
          className="relative flex w-48 items-center justify-between rounded-lg bg-gray-100 p-1 hover:cursor-pointer"
          role="tablist"
        >
          <div
            className={`absolute top-1 ${
              isEdit ? "left-1/2" : "left-1"
            } h-[calc(100%-0.5rem)] w-[calc(50%-0.25rem)] rounded-md bg-[#004DE8] transition-all duration-300 ease-in-out`}
          />
          <span
            onClick={() => handleTabChange("detail")}
            role="tab"
            tabIndex={0}
            className={`z-10 w-1/2 py-2 text-center text-sm font-medium transition-colors duration-300 ${
              !isEdit ? "text-white" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Detail
          </span>
          <span
            onClick={() => handleTabChange("edit")}
            role="tab"
            tabIndex={0}
            className={`z-10 w-1/2 py-2 text-center text-sm font-medium transition-colors duration-300 ${
              isEdit ? "text-white" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Edit
          </span>
        </div>
      </div>
      {/* Konten hanya ditampilkan jika bukan di /edit */}
      {!isEdit && <ThumbnailCard event={event} />}
    </div>
  );
};

export default SlugPage;
