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
import { ForgotPasswordSchema } from "../schema";
import useForgotPassword from "@/hooks/api/auth/useForgotPassword";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,

    onSubmit: async (values) => {
      await forgotPassword(values);
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
            <h1 className="text-center text-2xl font-semibold">
              Forgot your password?
            </h1>
            <div className="mb-10 space-y-2">
              <div className="text-center">
                <p className="text-muted-foreground text-sm">
                  No worries, it happens! Enter your email and we’ll send you a
                  link to reset it.
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
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Loading" : "Reset Password"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className="bg-muted relative hidden justify-center rounded-3xl md:block">
            <Image
              src="/passwordimg.webp"
              alt="Image"
              height={300}
              width={300}
              // fill
              className="absolute inset-0 top-1/2 left-1/2 flex h-[180px] w-full -translate-x-1/2 -translate-y-1/2 object-contain dark:brightness-[0.2] dark:grayscale"
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
