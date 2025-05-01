"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useChangePassword from "@/hooks/api/settings/useChangePassword";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ChangePasswordSchema } from "../schema";

const ChangePasswordForm = () => {
  const router = useRouter();

  const { mutateAsync: changePassword, isPending } = useChangePassword();

  const oldPassword = useId();
  const newPassword = useId();
  const confirmPassword = useId();

  const [isOldVisible, setIsOldVisible] = useState(false);
  const [isNewVisible, setIsNewVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const buttonStyle =
    "absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#004DE8]";

  const iconColor = (isVisible: boolean) =>
    isVisible ? "#004DE8" : "rgba(107, 114, 128, 0.7)"; // Biru saat aktif, gray saat biasa

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await changePassword({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        });
        resetForm();
        // router.push("/login");
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div>
      <div className="w-full rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
        <h4 className="mb-4 text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
          Change Password
        </h4>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="w-full space-y-5">
              {/* Old Password */}
              <div className="*:not-first:mt-2">
                <Label htmlFor={oldPassword}>Old Password</Label>
                <div className="relative max-w-2xl">
                  <Input
                    id={oldPassword}
                    className="pe-9"
                    placeholder="your old password"
                    name="oldPassword"
                    value={formik.values.oldPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type={isOldVisible ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={() => setIsOldVisible((prev) => !prev)}
                    className={buttonStyle + " hover:text-[#FF7F00]"}
                    aria-label={
                      isOldVisible ? "Hide password" : "Show password"
                    }
                    aria-pressed={isOldVisible}
                  >
                    {isOldVisible ? (
                      <EyeOffIcon size={18} color={iconColor(isOldVisible)} />
                    ) : (
                      <EyeIcon size={18} color={iconColor(isOldVisible)} />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="*:not-first:mt-2">
                <Label htmlFor={newPassword}>New Password</Label>
                <div className="relative max-w-2xl">
                  <Input
                    id={newPassword}
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full pe-9"
                    placeholder="Password"
                    type={isNewVisible ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={() => setIsNewVisible((prev) => !prev)}
                    className={buttonStyle + " hover:text-[#FF7F00]"}
                    aria-label={
                      isNewVisible ? "Hide password" : "Show password"
                    }
                    aria-pressed={isNewVisible}
                  >
                    {isNewVisible ? (
                      <EyeOffIcon size={18} color={iconColor(isNewVisible)} />
                    ) : (
                      <EyeIcon size={18} color={iconColor(isNewVisible)} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="*:not-first:mt-2">
                <Label htmlFor={confirmPassword}>Confirm Password</Label>
                <div className="relative max-w-2xl">
                  <Input
                    id={confirmPassword}
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full pe-9"
                    placeholder="Password"
                    type={isConfirmVisible ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={() => setIsConfirmVisible((prev) => !prev)}
                    className={buttonStyle + " hover:text-[#FF7F00]"}
                    aria-label={
                      isConfirmVisible ? "Hide password" : "Show password"
                    }
                    aria-pressed={isConfirmVisible}
                  >
                    {isConfirmVisible ? (
                      <EyeOffIcon
                        size={18}
                        color={iconColor(isConfirmVisible)}
                      />
                    ) : (
                      <EyeIcon size={18} color={iconColor(isConfirmVisible)} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex max-w-2xl items-center gap-3 px-2 lg:justify-end">
            <Button size="sm" type="submit" disabled={isPending}>
              {isPending ? "Loading" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
