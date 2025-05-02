import * as Yup from "yup";

export const CreateTransactionSchema = Yup.object().shape({
  ticketId: Yup.number().required("TicketId is required"),
  qty: Yup.number().required("Please input qty"),
});
