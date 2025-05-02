"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCreateVoucher from "@/hooks/api/voucher/useCreateVoucher";
import { useFormik } from "formik";
import { CreateVoucherSchema } from "../schemas";

const CreateVoucherForm = () => {
  const { mutateAsync: createVoucher, isPending } = useCreateVoucher();

  const formik = useFormik({
    initialValues: {
      eventId: "",
      code: "",
      discountAmount: "",
      startDate: "",
      endDate: "",
      qty: "",
    },
    validationSchema: CreateVoucherSchema,
    onSubmit: async (values) => {
      await createVoucher(values);
    },
  });

  console.log("formik error", formik.errors);
  return (
    <form className="mt-10 space-y-4" onSubmit={formik.handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="eventId">eventId</Label>
        <Input
          id="eventId"
          name="eventId"
          type="text"
          placeholder="eventId"
          required
          value={formik.values.eventId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.eventId && !!formik.errors.eventId && (
          <p className="text-xs text-red-500">{formik.errors.eventId}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="code">Voucher Code</Label>
        <Input
          id="code"
          name="code"
          type="text"
          placeholder="code"
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
        <Label htmlFor="discountAmount">discountAmount</Label>
        <Input
          id="discountAmount"
          name="discountAmount"
          type="text"
          placeholder="discountAmount"
          required
          value={formik.values.discountAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.discountAmount && !!formik.errors.discountAmount && (
          <p className="text-xs text-red-500">{formik.errors.discountAmount}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="startDate">startDate</Label>
        <Input
          id="startDate"
          name="startDate"
          type="text"
          placeholder="startDate"
          required
          value={formik.values.startDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.startDate && !!formik.errors.startDate && (
          <p className="text-xs text-red-500">{formik.errors.startDate}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="endDate">endDate</Label>
        <Input
          id="endDate"
          name="endDate"
          type="text"
          placeholder="endDate"
          required
          value={formik.values.endDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.endDate && !!formik.errors.endDate && (
          <p className="text-xs text-red-500">{formik.errors.endDate}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="qty">qty</Label>
        <Input
          id="qty"
          name="qty"
          type="text"
          placeholder="qty"
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

export default CreateVoucherForm;
