"use client";
import CopyComponent from "@/components/CopyComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateProfileSchema } from "@/features/(dashboard)/profile/schema";
import useUpdateProfile from "@/hooks/api/auth/useUpdateProfile";
import { useFormik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const EditFormEvents = () => {
  const router = useRouter();
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();
  const session = useSession();
  const user = session.data?.user;

  const formik = useFormik({
    initialValues: {
      fullName: user?.fullName || "",
      userName: user?.userName || "",
    },
    enableReinitialize: true,
    validationSchema: UpdateProfileSchema,
    onSubmit: async (values) => {
      const result = await updateProfile(values);
      const updatedUser = {
        ...session?.data,
        ...result.data,
      };

      await signIn("credentials", {
        redirect: false,
        ...updatedUser,
        accessToken: result.data.accessToken,
      });
      router.refresh();
    },
  });

  return (
    <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
      <h4 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
        Profile Information
      </h4>

      {!!user && (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Your Name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                This is the name that will be displayed on your profile and in
                emails.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userName">Username</Label>
              <Input
                id="userName"
                name="userName"
                placeholder="username"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                This is your public display name. It can be your real name or a
                pseudonym.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <div className="rounded-md border-2 p-2">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.email}
                </p>
              </div>
              <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                This field cannot be changed.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs leading-normal text-gray-500 dark:text-gray-400">
                Role
              </p>
              <div className="rounded-md border-2 p-2">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.role}
                </p>
              </div>
              <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                This field cannot be changed.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs leading-normal text-gray-500 dark:text-gray-400">
                Referral Code
              </p>
              <div className="flex items-center gap-4">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.referralNumber}
                </p>
                <CopyComponent textToCopy={user?.referralNumber || ""} />
              </div>
              <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                Share this code with your friends and earn rewards!
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                formik.resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Loading..." : "Save Changes"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
