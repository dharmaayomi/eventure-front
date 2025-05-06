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
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const CreateVoucherForm = () => {
  const { mutateAsync: createVoucher, isPending } = useCreateVoucher();
  const { data: events } = useGetEventByOrganizer();

  console.log("events in create voucher", events);

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
    <form className="mt-10 space-y-4" onSubmit={formik.handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="eventName">Event Name</Label>
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
        <Label htmlFor="code">Voucher Code</Label>
        <Input
          id="code"
          name="code"
          type="text"
          placeholder="Voucher Code"
          required
          value={formik.values.code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.code && !!formik.errors.code && (
          <p className="text-xs text-red-500">{formik.errors.code}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="discountAmount">Discount Amount</Label>
        <Input
          id="discountAmount"
          name="discountAmount"
          type="number"
          placeholder="Discount Amount"
          required
          value={formik.values.discountAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.discountAmount && !!formik.errors.discountAmount && (
          <p className="text-xs text-red-500">{formik.errors.discountAmount}</p>
        )}
      </div>

      {/* START DATE */}
      <div className="grid gap-2">
        <Label htmlFor="startDate">Start Date of Discount </Label>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !formik.values.startDate && "text-muted-foreground",
              )}
              id="startDate"
              name="startDate"
              onBlur={() => formik.handleBlur("startDate")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formik.values.startDate ? (
                format(new Date(formik.values.startDate), "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
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

        {formik.touched.startDate && !!formik.errors.startDate && (
          <p className="text-xs text-red-500">
            {formik.errors.startDate as string}
          </p>
        )}
      </div>

      {/* END DATE */}
      <div className="grid gap-2">
        <Label htmlFor="endDate">End Date of Discount</Label>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !formik.values.endDate && "text-muted-foreground",
              )}
              id="endDate"
              name="endDate"
              onBlur={() => formik.handleBlur("endDate")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formik.values.endDate ? (
                format(new Date(formik.values.endDate), "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
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

        {formik.touched.endDate && !!formik.errors.endDate && (
          <p className="text-xs text-red-500">
            {formik.errors.endDate as string}
          </p>
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

export default CreateVoucherForm;
