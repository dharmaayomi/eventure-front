import BankPage from "@/features/(dashboard)/bank";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const BankAccount = async () => {
  const session = await auth();

  if (!!!session) return redirect("/");

  if (session.user.role !== "ADMIN") return redirect("/dashboard/profile");
  return (
    <div>
      <BankPage />
    </div>
  );
};

export default BankAccount;
