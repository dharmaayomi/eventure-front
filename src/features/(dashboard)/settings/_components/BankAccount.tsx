"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetOrganizerByUserId from "@/hooks/api/organizer/useGetOrganizerByUserId";
import useUpdateBank from "@/hooks/api/organizer/useUpdateBank";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { UpdateBankOrganizerSchema } from "../schema";

interface BankAccountProps {
  id: number;
}

const BankAccount: FC<BankAccountProps> = ({ id }) => {
  const { data: organizer, isPending: isPendingGet } =
    useGetOrganizerByUserId(id);
  const router = useRouter();
  const { mutateAsync: updateBankOrganizer, isPending: isPendingUpdate } =
    useUpdateBank();
  const session = useSession();
  const user = session.data?.user;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      bankName: organizer?.bankName || "",
      bankAccountNumber: organizer?.bankAccountNumber || "",
      bankAccountHolder: organizer?.bankAccountHolder || "",
    },
    enableReinitialize: true,
    validationSchema: UpdateBankOrganizerSchema,
    onSubmit: async (values) => {
      try {
        console.log("Submitting payload:", values);
        // Make sure we're passing the organizer ID with the update
        await updateBankOrganizer({
          ...values,
          id: organizer?.id,
        });
        setIsDialogOpen(false);
        router.push(`/dashboard/settings`);
      } catch (error) {
        console.error("Failed to update bank information:", error);
      }
    },
  });

  const handleSaveClick = () => {
    if (formik.isValid && formik.dirty) {
      setIsDialogOpen(true);
    }
  };

  if (isPendingGet) {
    return (
      <div className="flex h-64 items-center justify-center p-6">
        <div className="animate-pulse font-medium text-[#004DE8]">
          Loading bank information...
        </div>
      </div>
    );
  }

  if (!organizer && !isPendingGet) {
    return (
      <div className="rounded-lg border border-red-100 bg-red-50 p-6 text-center text-red-600">
        Organizer not found
      </div>
    );
  }

  const hasBankInfo = !!(
    organizer?.bankName ||
    organizer?.bankAccountNumber ||
    organizer?.bankAccountHolder
  );

  return (
    <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800 dark:bg-gray-900">
      <h4 className="mb-6 border-b border-[#004DE8]/10 pb-3 text-lg font-semibold text-gray-500 dark:text-gray-400">
        Bank Account
      </h4>

      {!hasBankInfo && (
        <div className="mb-6 rounded-lg bg-yellow-50 p-4 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-200">
          <p className="font-medium">Please add your bank information</p>
          <p className="mt-1 text-sm">
            Complete your bank account details to receive payments for your
            events.
          </p>
        </div>
      )}

      {!!user && (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="bankName"
              className="font-medium text-gray-500 dark:text-gray-400"
            >
              Bank Name
            </Label>
            <Input
              id="bankName"
              name="bankName"
              placeholder="Enter bank name"
              value={formik.values.bankName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-gray-300 transition-all focus:border-[#004DE8] focus:ring focus:ring-[#004DE8]/20 dark:border-gray-700"
            />
            {formik.touched.bankName && formik.errors.bankName && (
              <p className="text-sm font-medium text-red-500">
                {formik.errors.bankName}
              </p>
            )}
            <p className="text-xs font-light text-gray-500 dark:text-gray-400">
              The name of your banking institution.
            </p>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="bankAccountHolder"
              className="font-medium text-gray-500 dark:text-gray-400"
            >
              Account Holder Name
            </Label>
            <Input
              id="bankAccountHolder"
              name="bankAccountHolder"
              placeholder="Enter account holder name"
              value={formik.values.bankAccountHolder}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-gray-300 transition-all focus:border-[#004DE8] focus:ring focus:ring-[#004DE8]/20 dark:border-gray-700"
            />
            {formik.touched.bankAccountHolder &&
              formik.errors.bankAccountHolder && (
                <p className="text-sm font-medium text-red-500">
                  {formik.errors.bankAccountHolder}
                </p>
              )}
            <p className="text-xs font-light text-gray-500 dark:text-gray-400">
              The name registered with this bank account.
            </p>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="bankAccountNumber"
              className="font-medium text-gray-500 dark:text-gray-400"
            >
              Account Number
            </Label>
            <Input
              id="bankAccountNumber"
              name="bankAccountNumber"
              placeholder="Enter account number"
              value={formik.values.bankAccountNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-gray-300 transition-all focus:border-[#004DE8] focus:ring focus:ring-[#004DE8]/20 dark:border-gray-700"
            />
            {formik.touched.bankAccountNumber &&
              formik.errors.bankAccountNumber && (
                <p className="text-sm font-medium text-red-500">
                  {formik.errors.bankAccountNumber}
                </p>
              )}
            <p className="text-xs font-light text-gray-500 dark:text-gray-400">
              Your bank account number for receiving payments.
            </p>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-6 dark:border-gray-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                formik.resetForm();
              }}
              className="border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={isPendingUpdate || !formik.isValid || !formik.dirty}
              onClick={handleSaveClick}
              className="bg-[#004DE8] text-white hover:bg-[#004DE8]/90"
            >
              {isPendingUpdate ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Bank Account Update</DialogTitle>
            <DialogDescription>
              Are you sure you want to update your bank account information?
              This information will be used for all future payment processing.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={() => formik.handleSubmit()}
              disabled={isPendingUpdate}
              className="bg-[#004DE8] text-white hover:bg-[#004DE8]/90"
            >
              {isPendingUpdate ? "Saving..." : "Confirm Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BankAccount;
