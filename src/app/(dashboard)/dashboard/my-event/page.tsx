import MyEventPage from "@/features/(dashboard)/my-event";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const MyEvent = async () => {
  const session = await auth();

  if (!session) return redirect("/");
  if (session.user.role !== "ADMIN") return redirect("/dashboard/profile");

  return (
    <div>
      <MyEventPage />
    </div>
  );
};

export default MyEvent;
