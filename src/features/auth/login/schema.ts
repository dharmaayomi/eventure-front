import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .minUppercase(1, "Must contain at least 1 uppercase letter")
    .minNumbers(1, "Must contain at least 1 number")
    .required("Password is Required"),
});
