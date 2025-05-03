import { CategoryName, Location } from "@/types/event";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const UpdateEventSchema = Yup.object().shape({
  name: Yup.string().optional(),
  desc: Yup.string().optional(),
  startDate: Yup.string().optional(),
  endDate: Yup.string().optional(),
  category: Yup.string()
    .oneOf(Object.values(CategoryName), "Invalid category")
    .optional(),

  location: Yup.string()
    .oneOf(Object.values(Location), "Invalid location")
    .optional(),
});

export const UploadEventThumbnailSchema = Yup.object().shape({
  thumbnail: Yup.mixed().required("Profile picture is required"),
});
