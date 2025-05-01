import SettingPage from "@/features/(dashboard)/settings";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const Settings = async () => {
  const session = await auth();

  if (!!!session) return redirect("/");
  return (
    <div>
      <SettingPage />
    </div>
  );
};

export default Settings;
