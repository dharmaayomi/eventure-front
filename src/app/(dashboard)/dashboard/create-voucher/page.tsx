import CreateVoucherForm from "@/features/(dashboard)/create-voucher/components/CreateVoucherForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const CreateVoucher = async () => {
  const session = await auth();

  if (!!!session) return redirect("/register");
  if (session.user.role !== "ADMIN") return redirect("/register");

  return (
    <main className="container mx-auto">
      <div>
        <CreateVoucherForm />
      </div>
    </main>
  );
};

export default CreateVoucher;
