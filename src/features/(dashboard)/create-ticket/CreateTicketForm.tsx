// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import useCreateTicket from "@/hooks/api/event/useCreateTicket";
// import useGetEventByOrganizer from "@/hooks/api/event/useGetEventByOrganizer";
// import { useFormik } from "formik";
// import { CreateTicketSchema } from "./schemas";

// const CreateTicketForm = () => {
//   const { mutateAsync: createTicket, isPending } = useCreateTicket();
//   const { data: events } = useGetEventByOrganizer();

//   const formik = useFormik({
//     initialValues: {
//       eventName: "",
//       ticketType: "",
//       price: 0,
//       qty: 0,
//     },
//     validationSchema: CreateTicketSchema,
//     onSubmit: async (values) => {
//       console.log("mengirim data ini untuk tiket", values);
//       await createTicket(values);
//     },
//   });

//   return (
//     <form className="mt-10 space-y-4" onSubmit={formik.handleSubmit}>
//       <div className="grid gap-2">
//         <Label htmlFor="eventName">Event</Label>
//         <select
//           id="eventName"
//           name="eventName"
//           required
//           value={formik.values.eventName}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           className="rounded-md border border-gray-200 shadow-2xs"
//         >
//           <option value="" disabled>
//             Select Event
//           </option>

//           {events?.data.map((event) => (
//             <option key={event.name} value={event.name}>
//               {event.name}
//             </option>
//           ))}
//         </select>
//         {formik.touched.eventName && !!formik.errors.eventName && (
//           <p className="text-xs text-red-500">{formik.errors.eventName}</p>
//         )}
//       </div>

//       <div className="grid gap-2">
//         <Label htmlFor="ticketType">Ticket Type</Label>
//         <Input
//           id="ticketType"
//           name="ticketType"
//           type="text"
//           placeholder="Ticket Type"
//           required
//           value={formik.values.ticketType}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//         {formik.touched.ticketType && !!formik.errors.ticketType && (
//           <p className="text-xs text-red-500">{formik.errors.ticketType}</p>
//         )}
//       </div>

//       <div className="grid gap-2">
//         <Label htmlFor="price">Price</Label>
//         <Input
//           id="price"
//           name="price"
//           type="number"
//           placeholder="Price"
//           required
//           value={formik.values.price}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//         {formik.touched.price && !!formik.errors.price && (
//           <p className="text-xs text-red-500">{formik.errors.price}</p>
//         )}
//       </div>

//       <div className="grid gap-2">
//         <Label htmlFor="qty">Quantity</Label>
//         <Input
//           id="qty"
//           name="qty"
//           type="number"
//           placeholder="Quantity"
//           required
//           value={formik.values.qty}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//         {formik.touched.qty && !!formik.errors.qty && (
//           <p className="text-xs text-red-500">{formik.errors.qty}</p>
//         )}
//       </div>

//       <div className="flex justify-end">
//         <Button type="submit" disabled={isPending}>
//           {isPending ? "Loading" : "Submit"}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default CreateTicketForm;
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCreateTicket from "@/hooks/api/event/useCreateTicket";
import useGetEventByOrganizer from "@/hooks/api/event/useGetEventByOrganizer";
import { useFormik } from "formik";
import { Loader2, Ticket, CreditCard, Package } from "lucide-react";
import { CreateTicketSchema } from "./schemas";

const CreateTicketForm = () => {
  const { mutateAsync: createTicket, isPending } = useCreateTicket();
  const { data: events, isLoading: isLoadingEvents } = useGetEventByOrganizer();

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
    <div className="mx-auto rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Create New Ticket</h2>
        <p className="text-sm text-gray-500">
          Fill in the details to create a new ticket for your event
        </p>
      </div>

      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div className="space-y-4">
          <div className="grid gap-3">
            <Label htmlFor="eventName" className="font-medium text-gray-700">
              Select Event
            </Label>
            <div className="relative">
              <select
                id="eventName"
                name="eventName"
                required
                value={formik.values.eventName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                disabled={isLoadingEvents}
              >
                <option value="" disabled>
                  {isLoadingEvents ? "Loading events..." : "Select an event"}
                </option>

                {events?.data.map((event) => (
                  <option key={event.name} value={event.name}>
                    {event.name}
                  </option>
                ))}
              </select>
              {formik.touched.eventName && !!formik.errors.eventName && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.eventName}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="ticketType" className="font-medium text-gray-700">
              Ticket Type
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Ticket size={18} className="text-gray-400" />
              </div>
              <Input
                id="ticketType"
                name="ticketType"
                type="text"
                placeholder="e.g. VIP, Regular, Early Bird"
                required
                value={formik.values.ticketType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pl-10"
              />
            </div>
            {formik.touched.ticketType && !!formik.errors.ticketType && (
              <p className="text-sm text-red-500">{formik.errors.ticketType}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="grid gap-3">
              <Label htmlFor="price" className="font-medium text-gray-700">
                Price
              </Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <CreditCard size={18} className="text-gray-400" />
                </div>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="0"
                  required
                  min="0"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="pl-10"
                />
              </div>
              {formik.touched.price && !!formik.errors.price && (
                <p className="text-sm text-red-500">{formik.errors.price}</p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="qty" className="font-medium text-gray-700">
                Quantity
              </Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Package size={18} className="text-gray-400" />
                </div>
                <Input
                  id="qty"
                  name="qty"
                  type="number"
                  placeholder="0"
                  required
                  min="1"
                  value={formik.values.qty}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="pl-10"
                />
              </div>
              {formik.touched.qty && !!formik.errors.qty && (
                <p className="text-sm text-red-500">{formik.errors.qty}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="px-5"
            onClick={() => formik.resetForm()}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" className="px-5" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" /> Creating...
              </>
            ) : (
              "Create Ticket"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicketForm;
