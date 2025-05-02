import * as Yup from "yup";

export const CreateEventSchema = Yup.object().shape({
  categoryId: Yup.string().required("CategoryId is required"),
  organizerId: Yup.string().required("OrganizerId is required"),
  slug: Yup.string().nullable().notRequired(),
  name: Yup.string().required("Name is required"),
  desc: Yup.string().required("Desc is required"),
  startDate: Yup.string().required("StartDate is required"),
  endDate: Yup.string().required("EndDate is required"),
  location: Yup.string().required("Location is required"),
  thumbnail: Yup.mixed().nullable().required("Thumbnail is required"),
});
