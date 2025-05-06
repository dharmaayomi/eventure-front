import { Rating } from "@/types/rating";
import * as Yup from "yup";

export const AddReviewSchema = Yup.object().shape({
  review: Yup.string().required("Review is required"),
  rating: Yup.mixed<Rating>()
    .oneOf(Object.values(Rating), "Rating is required")
    .required("Rating is required"),
});
