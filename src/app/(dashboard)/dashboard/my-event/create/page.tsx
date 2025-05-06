import CreateEventForm from "@/features/event/create-event/components/CreateEventForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const CreateEvent = async () => {
  const session = await auth();

  if (!!!session) return redirect("/register");
  if (session.user.role !== "ADMIN") return redirect("/register");

  return (
    <main className="container mx-auto">
      <div className="p-10">
        <CreateEventForm />
      </div>
    </main>
  );
};

export default CreateEvent;
