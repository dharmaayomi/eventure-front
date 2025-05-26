"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { EditFormEvents } from "./_components/EditFormEvents";
import { ThumbnailEvent } from "./_components/ThumbnailEvent";

const EditEventPage = () => {
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
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        {/* btw ini masihhh mencobaaa */}
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
          <ThumbnailEvent slug={slug as string} />
          <EditFormEvents slug={slug as string} />
        </div>
      </div>
    </div>
  );
};

export default EditEventPage;
