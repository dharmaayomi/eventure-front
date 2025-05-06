import * as Yup from "yup";

export const CreateTicketSchema = Yup.object().shape({
  eventName: Yup.string().required("Select at least one event"),
  ticketType: Yup.string().required("Ticket type is required"),
  price: Yup.number().required("Price is required"),
  qty: Yup.number().required("Quantity is required"),
});
