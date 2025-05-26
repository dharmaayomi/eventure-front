"use client";

import { useSession } from "next-auth/react";
import { OrganizerInfoCard } from "./_components/OrganizeInfoCard";
import { OrganizerCard } from "./_components/OrganizerCard";

const OrganizerPage = () => {
  const session = useSession();

  return (
    <div>
      <div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <h3 className="mb-5 text-2xl font-semibold text-gray-800 lg:mb-7 dark:text-white/90">
            Organizer Profile
          </h3>
          {!!session.data?.user && (
            <div className="space-y-6">
              <OrganizerCard id={session.data.user.id} />
              <OrganizerInfoCard id={session.data.user.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerPage;
