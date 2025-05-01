"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLogin from "@/hooks/api/auth/useLogin";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { LoginSchema } from "../schema";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { mutateAsync: login, isPending } = useLogin();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const iconColor = (isVisible: boolean) =>
    isVisible ? "#004DE8" : "rgba(107, 114, 128, 0.7)";
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,

    onSubmit: async (values) => {
      await login(values);
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
            <h1 className="text-center text-2xl font-bold">Welcome back!</h1>
            <div className="mb-10 space-y-2">
              <div className="text-center">
                <p className="text-muted-foreground text-sm">
                  Login to access your Eventure account
                </p>
              </div>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
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

                  {/* Password */}
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password">
                        <p className="text-muted-foreground pointer text-sm hover:underline">
                          forgot password
                        </p>
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="••••••••"
                        required
                        className="pe-9"
                      />
                      <button
                        type="button"
                        onClick={() => setIsPasswordVisible((prev) => !prev)}
                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-colors outline-none hover:text-[#FF7F00] focus-visible:ring-2 focus-visible:ring-[#004DE8] focus-visible:ring-offset-2"
                        aria-label={
                          isPasswordVisible ? "Hide password" : "Show password"
                        }
                        aria-pressed={isPasswordVisible}
                      >
                        {isPasswordVisible ? (
                          <EyeOffIcon
                            size={18}
                            color={iconColor(isPasswordVisible)}
                          />
                        ) : (
                          <EyeIcon
                            size={18}
                            color={iconColor(isPasswordVisible)}
                          />
                        )}
                      </button>
                    </div>
                    {!!formik.touched.password && !!formik.errors.password && (
                      <p className="text-red-500">{formik.errors.password}</p>
                    )}
                  </div>

                  <Button type="submit" disabled={isPending} className="w-full">
                    {isPending ? "Loading" : "Sign In"}
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
        don&apos;t have an account?
        <Link
          href="/register"
          className="text-[#004DE8] underline underline-offset-4"
        >
          Sign Up
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
