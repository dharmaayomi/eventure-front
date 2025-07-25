"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useRegister from "@/hooks/api/auth/useRegister";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { RegisterSchema } from "../schema";
import { Card, CardContent } from "@/components/ui/card";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { mutateAsync: register, isPending } = useRegister();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      email: "",
      referralUsed: "",
      organizerName: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
    validationSchema: RegisterSchema,

    onSubmit: async (values) => {
      await register(values);
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-2">
          <Link href="/">
            <div>
              <Image
                src="/eventureLogo.webp"
                alt="logo"
                width={180}
                height={100}
                loading="lazy"
                style={{ objectFit: "contain" }}
              />
            </div>
          </Link>
        </div>
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="space-y-2 p-5 md:p-6">
            <h1 className="text-center text-4xl font-black">Register</h1>
            <div className="mb-10 space-y-2">
              <div className="text-center">
                <p className="text-muted-foreground text-sm">
                  Choose your role to begin your journey
                </p>
              </div>
              <div
                className="relative mx-auto mb-5 flex max-w-xs cursor-pointer items-center justify-between rounded-lg bg-gray-100 p-1"
                onClick={() =>
                  formik.setFieldValue(
                    "role",
                    formik.values.role === "user" ? "organizer" : "user",
                  )
                }
                role="switch"
                aria-checked={formik.values.role === "organizer"}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    formik.setFieldValue(
                      "role",
                      formik.values.role === "user" ? "organizer" : "user",
                    );
                  }
                }}
              >
                <span
                  className={`z-10 w-1/2 py-2 text-center text-sm font-medium transition-colors duration-300 ${
                    formik.values.role === "user"
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                >
                  User
                </span>
                <span
                  className={`z-10 w-1/2 py-2 text-center text-sm font-medium transition-colors duration-300 ${
                    formik.values.role === "organizer"
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                >
                  Organizer
                </span>
                <div
                  className={`absolute top-1 ${
                    formik.values.role === "organizer" ? "right-1" : "left-1"
                  } h-[calc(100%-0.5rem)] w-[calc(50%-0.25rem)] rounded-md bg-[#004DE8] transition-all duration-300 ease-in-out`}
                />
              </div>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4 md:flex-row">
                    {/* Full Name */}
                    <div className="grid gap-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Your Name"
                        required
                      />
                      {!!formik.touched.fullName &&
                        !!formik.errors.fullName && (
                          <p className="text-red-500">
                            {formik.errors.fullName}
                          </p>
                        )}
                    </div>

                    {/* User Name */}
                    <div className="grid gap-2">
                      <Label htmlFor="userName">User Name</Label>
                      <Input
                        id="userName"
                        name="userName"
                        placeholder="username"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {!!formik.touched.userName &&
                        !!formik.errors.userName && (
                          <p className="text-red-500">
                            {formik.errors.userName}
                          </p>
                        )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="m@example.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {!!formik.touched.email && !!formik.errors.email && (
                      <p className="text-red-500">{formik.errors.email}</p>
                    )}
                  </div>

                  {/* Referral */}
                  {formik.values.role === "user" && (
                    <div className="grid gap-2">
                      <Label htmlFor="referralUsed">Referral Number</Label>
                      <Input
                        id="referralUsed"
                        name="referralUsed"
                        value={formik.values.referralUsed}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Referral Code"
                      />
                      {!!formik.touched.referralUsed &&
                        !!formik.errors.referralUsed && (
                          <p className="text-red-500">
                            {formik.errors.referralUsed}
                          </p>
                        )}
                    </div>
                  )}

                  {formik.values.role === "organizer" && (
                    <div className="grid gap-2">
                      <Label htmlFor="organizerName">Organizer Name</Label>
                      <Input
                        id="organizerName"
                        name="organizerName"
                        value={formik.values.organizerName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Organizer Name"
                      />
                      {!!formik.touched.organizerName &&
                        !!formik.errors.organizerName && (
                          <p className="text-red-500">
                            {formik.errors.organizerName}
                          </p>
                        )}
                    </div>
                  )}

                  {/* Password */}
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="••••••••"
                      required
                    />
                    {!!formik.touched.password && !!formik.errors.password && (
                      <p className="text-red-500">{formik.errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="••••••••"
                      required
                    />
                    {!!formik.touched.confirmPassword &&
                      !!formik.errors.confirmPassword && (
                        <p className="text-red-500">
                          {formik.errors.confirmPassword}
                        </p>
                      )}
                  </div>

                  <Button type="submit" disabled={isPending} className="w-full">
                    {isPending ? "Loading" : "Sign Up"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className="bg-muted relative hidden justify-center rounded-3xl md:block">
            <Image
              src="/authbener.webp"
              alt="Image"
              height={500}
              width={500}
              // fill
              className="absolute inset-0 top-1/2 left-1/2 flex h-[300px] w-full -translate-x-1/2 -translate-y-1/2 object-contain dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      {/* Sign In Link */}
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[#004DE8] underline underline-offset-4"
        >
          Sign In
        </Link>
      </div>

      {/* Terms & Privacy */}
      <div className="text-muted-foreground hover:[&_a]:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
