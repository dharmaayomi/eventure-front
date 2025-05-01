import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const BankAccount = async () => {
  const session = await auth();

  if (!!!session) return redirect("/");

  if (session.user.role !== "ADMIN") return redirect("/dashboard/profile");
  return <div>BankAccount</div>;
};

export default BankAccount;
