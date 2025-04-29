import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const UpdateOrganizerSchema = Yup.object().shape({
  fullName: Yup.string().optional(),
  userName: Yup.string().optional(),
});

export const UploadOrganizerPicSchema = Yup.object().shape({
  profilePic: Yup.mixed().required("Profile picture is required"),
});
