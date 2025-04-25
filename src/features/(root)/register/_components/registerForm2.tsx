import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useRegister from "@/hooks/api/auth/useRegister";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { RegisterSchema } from "../schema";
import Image from "next/image";

export function RegisterForm2({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
      role: "user", //
    },
    validationSchema: RegisterSchema,

    onSubmit: async (values) => {
      await register(values);
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={formik.handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Register to Eventure
                </p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Label htmlFor="USER">User</Label>
                <Switch
                  id="airplane-mode"
                  checked={formik.values.role === "organizer"}
                  onCheckedChange={(checked) =>
                    formik.setFieldValue("role", checked ? "organizer" : "user")
                  }
                />
                <Label htmlFor="ORGANIZER">Organizer</Label>
              </div>
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
                {!!formik.touched.fullName && !!formik.errors.fullName && (
                  <p className="text-red-500">{formik.errors.fullName}</p>
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
                {!!formik.touched.userName && !!formik.errors.userName && (
                  <p className="text-red-500">{formik.errors.userName}</p>
                )}
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
                    <p className="text-red-500">{formik.errors.referralUsed}</p>
                  )}
              </div>

              {/* Organizer Name - only if organizer */}
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

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground hover:[&_a]:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
