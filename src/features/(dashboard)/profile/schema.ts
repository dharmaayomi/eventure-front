import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const UpdateProfileSchema = Yup.object().shape({
  fullName: Yup.string().optional(),
  userName: Yup.string().optional(),
});
