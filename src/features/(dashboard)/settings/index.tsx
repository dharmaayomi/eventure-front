"use client";

import { useSession } from "next-auth/react";
import ChangePasswordForm from "./_components/ChangePasswordForm";
import DeleteAccount from "./_components/DeleteAccount";

const SettingPage = () => {
  const session = useSession();
  const user = session.data?.user;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="mb-5 text-2xl font-semibold text-gray-800 lg:mb-7 dark:text-white/90">
        Settings
      </h3>
      {!!user && (
        <div className="space-y-6">
          <ChangePasswordForm />
          <DeleteAccount />
        </div>
      )}
    </div>
  );
};

export default SettingPage;
