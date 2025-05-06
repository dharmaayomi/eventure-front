import * as Yup from "yup";

export const CreateVoucherSchema = Yup.object().shape({
  eventName: Yup.string().required("Select at least one event"),
  code: Yup.string().required("Voucher code is required"),
  discountAmount: Yup.string().required("Discount amount is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date().required("End date is required"),
});
