"use client";

import useGetOrganizerByUserId from "@/hooks/api/organizer/useGetOrganizerByUserId";
import Image from "next/image";
import { FC } from "react";
import { ButtonOrganizerUploader } from "./ButtonOrganizerUploader";

interface OrganizerCardProps {
  id: number;
}

export const OrganizerCard: FC<OrganizerCardProps> = ({ id }) => {
  const { data: organizer } = useGetOrganizerByUserId(id);

  return (
    <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex w-full flex-col items-center gap-10 xl:flex-row">
          <div className="h-40 w-40 overflow-hidden rounded-xl border border-gray-200 md:h-50 md:w-50 dark:border-gray-800">
            {organizer && organizer.profilePic ? (
              <Image
                width={300}
                height={300}
                src={organizer.profilePic}
                alt="thumbnail"
                className="h-full w-full overflow-hidden object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No organizer image
                </p>
              </div>
            )}
          </div>

          <ButtonOrganizerUploader id={id} />
        </div>
      </div>
    </div>
  );
};
