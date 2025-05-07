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
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

import useGetOrganizerByUserId from "@/hooks/api/organizer/useGetOrganizerByUserId";
import useUpdateOrganizer from "@/hooks/api/organizer/useUpdateOrganizer";
import dynamic from "next/dynamic";
import { UpdateOrganizerSchema } from "../schema";
const TiptapRichtextEditor = dynamic(
  () => import("@/components/TiptapRichtextEditor"),
  { ssr: false },
);

interface OrganizerInfoCardProps {
  id: number;
}

export const OrganizerInfoCard: FC<OrganizerInfoCardProps> = ({ id }) => {
  const { data: organizer, isPending: isPendingGet } =
    useGetOrganizerByUserId(id);
  const organizerId = organizer?.id;
  const router = useRouter();
  const { mutateAsync: updateOrganizer, isPending: isPendingUpdate } =
    useUpdateOrganizer();
  const session = useSession();
  const user = session.data?.user;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: organizer?.name || "",
      aboutUs: organizer?.aboutUs || "",
    },
    enableReinitialize: true,
    validationSchema: UpdateOrganizerSchema,
    onSubmit: async (values) => {
      try {
        console.log("Submitting payload:", values);
        await updateOrganizer(values);
        setIsDialogOpen(false);
        router.push(`/dashboard/organizer`);
      } catch (error) {
        console.error("Failed to update organizer:", error);
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
          Loading organizer information...
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

  return (
    <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800 dark:bg-gray-900">
      <h4 className="mb-6 border-b border-[#004DE8]/10 pb-3 text-lg font-semibold text-gray-500 dark:text-gray-400">
        Organizer Information
      </h4>

      {!!user && (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="font-medium text-gray-500 dark:text-gray-400"
            >
              Organizer Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Organizer Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-gray-300 transition-all focus:border-[#004DE8] focus:ring focus:ring-[#004DE8]/20 dark:border-gray-700"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm font-medium text-red-500">
                {formik.errors.name}
              </p>
            )}
            <p className="text-xs font-light text-gray-500 dark:text-gray-400">
              Enter the full name of your organization as it will appear to
              users.
            </p>
          </div>

          <div className="space-y-2">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Email address
            </p>
            <div className="rounded-md border-2 p-2">
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.email}
              </p>
            </div>
            <p className="text-xs font-light text-gray-500 dark:text-gray-400">
              Contact email for your organization (cannot be changed).
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            {/* Member since */}
            <div className="space-y-2">
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Member Since
              </p>
              <div className="rounded-md border-2 p-2">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {organizer.createdAt
                    ? new Date(organizer.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                The date your organization was registered on our platform(cannot
                be changed).
              </p>
            </div>

            <div className="space-y-2">
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Role
              </p>
              <div className="rounded-md border-2 p-2">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.role}
                </p>
              </div>
              <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                Your access level and permissions within the platform(cannot be
                changed).
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
            <Label
              htmlFor="aboutUs"
              className="mb-2 block font-medium text-[#004DE8]/90"
            >
              About Us
            </Label>
            <TiptapRichtextEditor
              key={organizer?.aboutUs || ""}
              label=""
              field="aboutUs"
              isTouch={formik.touched.aboutUs}
              content={formik.values.aboutUs}
              onChange={(value: string) =>
                formik.setFieldValue("aboutUs", value)
              }
              setError={formik.setFieldError}
              setTouch={formik.setFieldTouched}
            />
            <p className="mt-2 text-xs font-light text-gray-500 dark:text-gray-400">
              Describe your organization, its mission, and what attendees can
              expect from your events.
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
            <DialogTitle>Confirm Organizer Update</DialogTitle>
            <DialogDescription>
              Are you sure you want to update this organizer information? This
              will change how your organization appears to all users.
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
