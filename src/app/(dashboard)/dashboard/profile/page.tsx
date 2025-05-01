import ProfilePage from "@/features/(dashboard)/profile";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const Profile = async () => {
  const session = await auth();

  if (!!!session) return redirect("/");
  return (
    <div>
      <ProfilePage />
    </div>
  );
};

export default Profile;
