"use client";
import CopyComponent from "@/components/CopyComponents";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUpdateProfile from "@/hooks/api/auth/useUpdateProfile";
import { useModal } from "@/hooks/useModal";
import { useFormik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UpdateProfileSchema } from "../schema";
import useGetProfile from "@/hooks/api/profile/useGetProfile";

export const UserInfoCard = () => {
  const router = useRouter();
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();
  const session = useSession();
  const userId = session?.data?.user.id;
  const { data: user } = useGetProfile(userId!);

  const { isOpen, openModal, closeModal } = useModal();

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
      closeModal();
      router.refresh();
    },
  });
  console.log("ini profile", user);
  const pointAmount = user?.pointDetails?.[0]?.amount ?? 0;
  const pointExpiredAt = user?.pointDetails?.[0]?.expiredAt;

  return (
    <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
            Profile Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div className="space-y-2">
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Full Name
              </p>
              <div className="rounded-md border-2 p-2">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.fullName}
                </p>
              </div>
              <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                This is the name that will be displayed on your profile and in
                emails.
              </p>
            </div>

            <div className="space-y-2">
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Username
              </p>
              <div className="rounded-md border-2 p-2">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.userName}
                </p>
              </div>
              <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                This is your public display name. It can be your real name or a
                pseudonym
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
                This field can not be changed
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
                This field can not be changed
              </p>
            </div>

            <div className="space-y-2">
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Referral Code
              </p>
              <div className="flex items-center gap-4">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.referralNumber}
                </p>
                <CopyComponent textToCopy={user?.referralNumber || ""} />{" "}
              </div>
              <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                Share this code with your friends and earn rewards!
              </p>
            </div>

            <div className="space-y-2">
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Your Points
              </p>
              <div className="rounded-md border-2 p-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {pointAmount.toLocaleString("id-ID")}
                  </p>
                  {pointExpiredAt && (
                    <p className="text-sm font-medium text-gray-300 italic dark:text-white/90">
                      expired at{" "}
                      {new Date(pointExpiredAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                This can be used whenever you want to checkout by ticking the
                point button
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={openModal}
          className="shadow-theme-xs flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 lg:inline-flex lg:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Edit
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
        <div className="no-scrollbar relative h-[90vh] w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
              Update your details to keep your profile up-to-date.
            </p>
          </div>

          {!!user && (
            <form className="flex flex-col" onSubmit={formik.handleSubmit}>
              <div className="custom-scrollbar h-[300px] overflow-y-auto px-2 pb-3">
                <div className="mt-7">
                  <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                    Personal Information
                  </h5>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                    <div className="col-span-2 space-y-2 lg:col-span-1">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Your Name"
                      />
                    </div>

                    <div className="col-span-2 space-y-2 lg:col-span-1">
                      <Label>Username</Label>
                      <Input
                        id="userName"
                        name="userName"
                        placeholder="username"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
                <Button size="sm" variant="outline" onClick={closeModal}>
                  Close
                </Button>
                <Button size="sm" type="submit" disabled={isPending}>
                  {isPending ? "Loading" : "Save Changes"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
};
