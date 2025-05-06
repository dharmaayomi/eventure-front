import useGetEventOrganizerBySlug from "@/hooks/api/event/useGetEventOrganizerBySlug";
import Image from "next/image";
import { FC } from "react";
import { ButtonUploader } from "./ButtonUploader";
interface ThumbnailEventProps {
  slug: string;
}

export const ThumbnailEvent: FC<ThumbnailEventProps> = ({ slug }) => {
  const { data: event } = useGetEventOrganizerBySlug(slug);
  return (
    <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex w-full flex-col items-center gap-6 xl:flex-row">
          <div className="h-40 w-80 overflow-hidden rounded-xl border border-gray-200 md:h-70 md:w-170 dark:border-gray-800">
            {event && (
              <Image
                width={300}
                height={300}
                src={event.thumbnail}
                alt="thumbnail"
                className="h-full w-full overflow-hidden object-cover"
              />
            )}
          </div>

          <ButtonUploader slug={slug} />
        </div>
      </div>
    </div>
  );
};
