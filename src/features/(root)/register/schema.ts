import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  userName: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  referralUsed: Yup.string().optional(),

  role: Yup.string().oneOf(["user", "organizer"]).required(),

  organizerName: Yup.string().when("role", {
    is: "organizer",
    then: (schema) => schema.required("Organizer name is required"),
    otherwise: (schema) => schema.optional(),
  }),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .minUppercase(1, "Must contain at least 1 uppercase letter")
    .minNumbers(1, "Must contain at least 1 number")
    .required("Password is Required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match!")
    .required("Confirm password is required"),
});
