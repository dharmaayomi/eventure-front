"use client";

import { useSession } from "next-auth/react";
import UserCard from "./_components/UserCard";
import { UserInfoCard } from "./_components/UserInfoCard";
import UserWalletCard from "./_components/UserWalletCard";

const ProfilePage = () => {
  const session = useSession();
  const user = session.data?.user;
  console.log("pliss berisii", session);

  return (
    <div>
      <div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <h3 className="mb-5 text-2xl font-semibold text-gray-800 lg:mb-7 dark:text-white/90">
            Profile
          </h3>
          {!!user && (
            <div className="space-y-6">
              <UserCard />
              <UserInfoCard />
              {/* <UserWalletCard /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
