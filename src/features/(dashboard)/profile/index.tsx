"use client";

import React from "react";
import UserCard from "./_components/UserCard";
import { User } from "lucide-react";
import UserWalletCard from "./_components/UserWalletCard";
import { useAuthStore } from "@/store/auth";
import { UserInfoCard } from "./_components/UserInfoCard";

const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <div>
      <div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 lg:mb-7 dark:text-white/90">
            Profile
          </h3>
          {!!user && (
            <div className="space-y-6">
              <UserCard />
              <UserInfoCard />
              <UserWalletCard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
