import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .minUppercase(1, "Must contain at least 1 uppercase letter")
    .minNumbers(1, "Must contain at least 1 number")
    .required("Password is Required"),

  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .minUppercase(1, "Must contain at least 1 uppercase letter")
    .minNumbers(1, "Must contain at least 1 number")
    .required("Password is Required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Password must match!")
    .required("Confirm password is required"),
});
