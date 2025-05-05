import * as Yup from "yup";

export const CreateEventSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  name: Yup.string().required("Event name is required"),
  desc: Yup.string().required("Event description is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date().required("End Date is required"),
  location: Yup.string().required("Location is required"),
  thumbnail: Yup.mixed().nullable().required("Thumbnail is required"),
});
