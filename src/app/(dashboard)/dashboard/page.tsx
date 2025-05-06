import DashboardPage from "@/features/(dashboard)/dashboard";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth();

  if (!!!session) return redirect("/");
  if (session.user.role !== "ADMIN") return redirect("/dashboard/profile");
  return (
    <main>
      <DashboardPage />{" "}
    </main>
  );
};
export default Dashboard;
