import { useState } from "react";
import DashboardList from "./_components/DashboardList";
import { useAuthStore } from "@/store/auth";

export default function DashboardPage() {
  const { user, clearAuth, isAdmin, isUser } = useAuthStore();

  return (
    <div>
      <DashboardList />
    </div>
  );
}
