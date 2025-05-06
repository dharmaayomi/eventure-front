"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCreateTicket from "@/hooks/api/event/useCreateTicket";
import useGetEventByOrganizer from "@/hooks/api/event/useGetEventByOrganizer";
import { useFormik } from "formik";
import { CreateTicketSchema } from "./schemas";

const CreateTicketForm = () => {
  const { mutateAsync: createTicket, isPending } = useCreateTicket();
  const { data: events } = useGetEventByOrganizer();

  const formik = useFormik({
    initialValues: {
      eventName: "",
      ticketType: "",
      price: 0,
      qty: 0,
    },
    validationSchema: CreateTicketSchema,
    onSubmit: async (values) => {
      console.log("mengirim data ini untuk tiket", values);
      await createTicket(values);
    },
  });

  return (
    <form className="mt-10 space-y-4" onSubmit={formik.handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="eventName">Event</Label>
        <select
          id="eventName"
          name="eventName"
          required
          value={formik.values.eventName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="rounded-md border border-gray-200 shadow-2xs"
        >
          <option value="" disabled>
            Select Event
          </option>

          {events?.data.map((event) => (
            <option key={event.name} value={event.name}>
              {event.name}
            </option>
          ))}
        </select>
        {formik.touched.eventName && !!formik.errors.eventName && (
          <p className="text-xs text-red-500">{formik.errors.eventName}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="ticketType">Ticket Type</Label>
        <Input
          id="ticketType"
          name="ticketType"
          type="text"
          placeholder="Ticket Type"
          required
          value={formik.values.ticketType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.ticketType && !!formik.errors.ticketType && (
          <p className="text-xs text-red-500">{formik.errors.ticketType}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          placeholder="Price"
          required
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.price && !!formik.errors.price && (
          <p className="text-xs text-red-500">{formik.errors.price}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="qty">Quantity</Label>
        <Input
          id="qty"
          name="qty"
          type="number"
          placeholder="Quantity"
          required
          value={formik.values.qty}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.qty && !!formik.errors.qty && (
          <p className="text-xs text-red-500">{formik.errors.qty}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Loading" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default CreateTicketForm;
