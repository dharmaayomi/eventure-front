import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const UpdateOrganizerSchema = Yup.object().shape({
  name: Yup.string().optional(),
  aboutUs: Yup.string().optional(),
});

export const UploadOrganizerPicSchema = Yup.object().shape({
  profilePic: Yup.mixed().required("Organizer picture is required"),
});
