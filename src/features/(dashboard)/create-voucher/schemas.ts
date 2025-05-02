import * as Yup from "yup";

export const CreateVoucherSchema = Yup.object().shape({
  eventId: Yup.string().required("eventId is required"),
  code: Yup.string().required("Voucher code is required"),
  discountAmount: Yup.number().required("discountAmount is required"),
  startDate: Yup.string().required("startDate is required"),
  endDate: Yup.string().required("endDate is required"),
  qty: Yup.string().required("qty is required"),
});
