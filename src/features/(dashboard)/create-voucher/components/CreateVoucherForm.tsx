// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import useCreateVoucher from "@/hooks/api/voucher/useCreateVoucher";
// import { useFormik } from "formik";
// import { CreateVoucherSchema } from "../schemas";
// import useGetEventByOrganizer from "@/hooks/api/event/useGetEventByOrganizer";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { CalendarIcon } from "lucide-react";
// import { format } from "date-fns";
// import { Calendar } from "@/components/ui/calendar";
// import { cn } from "@/lib/utils";

// const CreateVoucherForm = () => {
//   const { mutateAsync: createVoucher, isPending } = useCreateVoucher();
//   const { data: events } = useGetEventByOrganizer();

//   console.log("events in create voucher", events);

//   const formik = useFormik({
//     initialValues: {
//       eventName: "",
//       code: "",
//       discountAmount: "",
//       startDate: new Date(),
//       endDate: new Date(),
//     },
//     validationSchema: CreateVoucherSchema,
//     onSubmit: async (values) => {
//       console.log("onsubmit sending data", values);
//       await createVoucher(values);
//       console.log("voucher created");
//     },
//   });

//   return (
//     <form className="mt-10 space-y-4" onSubmit={formik.handleSubmit}>
//       <div className="grid gap-2">
//         <Label htmlFor="eventName">Event Name</Label>
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
//         <Label htmlFor="code">Voucher Code</Label>
//         <Input
//           id="code"
//           name="code"
//           type="text"
//           placeholder="Voucher Code"
//           required
//           value={formik.values.code}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//         {formik.touched.code && !!formik.errors.code && (
//           <p className="text-xs text-red-500">{formik.errors.code}</p>
//         )}
//       </div>

//       <div className="grid gap-2">
//         <Label htmlFor="discountAmount">Discount Amount</Label>
//         <Input
//           id="discountAmount"
//           name="discountAmount"
//           type="number"
//           placeholder="Discount Amount"
//           required
//           value={formik.values.discountAmount}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//         {formik.touched.discountAmount && !!formik.errors.discountAmount && (
//           <p className="text-xs text-red-500">{formik.errors.discountAmount}</p>
//         )}
//       </div>

//       {/* START DATE */}
//       <div className="grid gap-2">
//         <Label htmlFor="startDate">Start Date of Discount </Label>

//         <Popover>
//           <PopoverTrigger asChild>
//             <Button
//               variant={"outline"}
//               className={cn(
//                 "w-full justify-start text-left font-normal",
//                 !formik.values.startDate && "text-muted-foreground",
//               )}
//               id="startDate"
//               name="startDate"
//               onBlur={() => formik.handleBlur("startDate")}
//             >
//               <CalendarIcon className="mr-2 h-4 w-4" />
//               {formik.values.startDate ? (
//                 format(new Date(formik.values.startDate), "PPP")
//               ) : (
//                 <span>Pick a date</span>
//               )}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0">
//             <Calendar
//               mode="single"
//               selected={
//                 formik.values.startDate
//                   ? new Date(formik.values.startDate)
//                   : undefined
//               }
//               onSelect={(date) => {
//                 formik.setFieldValue("startDate", date);
//               }}
//               initialFocus
//             />
//           </PopoverContent>
//         </Popover>

//         {formik.touched.startDate && !!formik.errors.startDate && (
//           <p className="text-xs text-red-500">
//             {formik.errors.startDate as string}
//           </p>
//         )}
//       </div>

//       {/* END DATE */}
//       <div className="grid gap-2">
//         <Label htmlFor="endDate">End Date of Discount</Label>

//         <Popover>
//           <PopoverTrigger asChild>
//             <Button
//               variant={"outline"}
//               className={cn(
//                 "w-full justify-start text-left font-normal",
//                 !formik.values.endDate && "text-muted-foreground",
//               )}
//               id="endDate"
//               name="endDate"
//               onBlur={() => formik.handleBlur("endDate")}
//             >
//               <CalendarIcon className="mr-2 h-4 w-4" />
//               {formik.values.endDate ? (
//                 format(new Date(formik.values.endDate), "PPP")
//               ) : (
//                 <span>Pick a date</span>
//               )}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0">
//             <Calendar
//               mode="single"
//               selected={
//                 formik.values.endDate
//                   ? new Date(formik.values.endDate)
//                   : undefined
//               }
//               onSelect={(date) => {
//                 formik.setFieldValue("endDate", date);
//               }}
//               initialFocus
//             />
//           </PopoverContent>
//         </Popover>

//         {formik.touched.endDate && !!formik.errors.endDate && (
//           <p className="text-xs text-red-500">
//             {formik.errors.endDate as string}
//           </p>
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

// export default CreateVoucherForm;
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCreateVoucher from "@/hooks/api/voucher/useCreateVoucher";
import { useFormik } from "formik";
import { CreateVoucherSchema } from "../schemas";
import useGetEventByOrganizer from "@/hooks/api/event/useGetEventByOrganizer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2, Ticket, Tag, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const CreateVoucherForm = () => {
  const { mutateAsync: createVoucher, isPending } = useCreateVoucher();
  const { data: events, isLoading: isLoadingEvents } = useGetEventByOrganizer();

  const formik = useFormik({
    initialValues: {
      eventName: "",
      code: "",
      discountAmount: "",
      startDate: new Date(),
      endDate: new Date(),
    },
    validationSchema: CreateVoucherSchema,
    onSubmit: async (values) => {
      console.log("onsubmit sending data", values);
      await createVoucher(values);
      console.log("voucher created");
    },
  });

  return (
    <div className="mx-auto rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Create New Voucher</h2>
        <p className="text-sm text-gray-500">
          Fill in the details to create a discount voucher for your event
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
            <Label htmlFor="code" className="font-medium text-gray-700">
              Voucher Code
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Tag size={18} className="text-gray-400" />
              </div>
              <Input
                id="code"
                name="code"
                type="text"
                placeholder="e.g. SUMMER25, EARLYBIRD"
                required
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pl-10"
              />
            </div>
            {formik.touched.code && !!formik.errors.code && (
              <p className="text-sm text-red-500">{formik.errors.code}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label
              htmlFor="discountAmount"
              className="font-medium text-gray-700"
            >
              Discount Amount
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Ticket size={18} className="text-gray-400" />
              </div>
              <Input
                id="discountAmount"
                name="discountAmount"
                type="number"
                placeholder="Discount value"
                required
                min="0"
                value={formik.values.discountAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pl-10"
              />
            </div>
            {formik.touched.discountAmount &&
              !!formik.errors.discountAmount && (
                <p className="text-sm text-red-500">
                  {formik.errors.discountAmount}
                </p>
              )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* START DATE */}
            <div className="grid gap-3">
              <Label htmlFor="startDate" className="font-medium text-gray-700">
                Start Date
              </Label>
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start pl-10 text-left font-normal",
                        !formik.values.startDate && "text-muted-foreground",
                      )}
                      id="startDate"
                      name="startDate"
                      onBlur={() => formik.handleBlur("startDate")}
                    >
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <CalendarIcon size={18} className="text-gray-400" />
                      </div>
                      {formik.values.startDate ? (
                        format(new Date(formik.values.startDate), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={
                        formik.values.startDate
                          ? new Date(formik.values.startDate)
                          : undefined
                      }
                      onSelect={(date) => {
                        formik.setFieldValue("startDate", date);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {formik.touched.startDate && !!formik.errors.startDate && (
                <p className="text-sm text-red-500">
                  {formik.errors.startDate as string}
                </p>
              )}
            </div>

            {/* END DATE */}
            <div className="grid gap-3">
              <Label htmlFor="endDate" className="font-medium text-gray-700">
                End Date
              </Label>
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start pl-10 text-left font-normal",
                        !formik.values.endDate && "text-muted-foreground",
                      )}
                      id="endDate"
                      name="endDate"
                      onBlur={() => formik.handleBlur("endDate")}
                    >
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <CalendarIcon size={18} className="text-gray-400" />
                      </div>
                      {formik.values.endDate ? (
                        format(new Date(formik.values.endDate), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={
                        formik.values.endDate
                          ? new Date(formik.values.endDate)
                          : undefined
                      }
                      onSelect={(date) => {
                        formik.setFieldValue("endDate", date);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {formik.touched.endDate && !!formik.errors.endDate && (
                <p className="text-sm text-red-500">
                  {formik.errors.endDate as string}
                </p>
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
              "Create Voucher"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateVoucherForm;
