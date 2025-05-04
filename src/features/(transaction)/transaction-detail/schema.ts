import * as Yup from "yup";

export const UploadProofSchema = Yup.object().shape({
  paymentProof: Yup.mixed().nullable().required("Payment proof is required"),
});
