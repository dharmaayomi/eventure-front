import CreateTicketForm from "@/features/(dashboard)/create-ticket/CreateTicketForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const CreateTicket = async () => {
  const session = await auth();

  if (!!!session) return redirect("/register");
  if (session.user.role !== "ADMIN") return redirect("/register");

  return (
    <div>
      <CreateTicketForm />
    </div>
  );
};

export default CreateTicket;
