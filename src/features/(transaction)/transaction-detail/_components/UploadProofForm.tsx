"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUploadProof from "@/hooks/api/transaction/useUploadProof";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, FC, useRef, useState } from "react";
import { UploadProofSchema } from "../schema";

interface UploadProofFormProps {
  uuid: string;
}

const UploadProofForm: FC<UploadProofFormProps> = ({ uuid }) => {
  const { mutateAsync: uploadProof, isPending } = useUploadProof(uuid);

  const formik = useFormik({
    initialValues: {
      paymentProof: null,
    },
    validationSchema: UploadProofSchema,
    onSubmit: async (values) => {
      await uploadProof(values);
    },
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
  const paymentProofRef = useRef<HTMLInputElement>(null);

  const onChangeProof = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget?.files?.[0];

    if (files) {
      formik.setFieldValue("paymentProof", files);
      setSelectedImage(URL.createObjectURL(files));
    }
  };

  const removeProof = () => {
    formik.setFieldValue("paymentProof", null);
    setSelectedImage("");
    if (paymentProofRef.current) {
      paymentProofRef.current.value = "";
    }
  };

  console.log(formik.errors);
  return (
    <form className="mt-5 space-y-6 p-6" onSubmit={formik.handleSubmit}>
      {selectedImage ? (
        <>
          <div className="relative h-[150px] w-[200px] overflow-hidden rounded-md">
            <Image
              src={selectedImage}
              alt="paymentProof"
              className="object-cover"
              fill
            />
          </div>
          <Button
            variant="destructive"
            type="button"
            onClick={removeProof}
            className="mt-2"
          >
            Remove
          </Button>
        </>
      ) : (
        <div className="grid gap-2">
          <Label
            htmlFor="paymentProof"
            className="text-sm font-medium text-gray-700"
          >
            Payment Proof
          </Label>
          <Input
            ref={paymentProofRef}
            id="paymentProof"
            type="file"
            accept="image/*"
            onChange={onChangeProof}
            className="file:mr-4 file:rounded-sm file:border-0 file:bg-[#004DE8] file:p-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#004DE8]/80"
          />
          {formik.touched.paymentProof && !!formik.errors.paymentProof && (
            <p className="text-xs text-red-500">{formik.errors.paymentProof}</p>
          )}
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isPending} className="w-32">
          {isPending ? "Loading..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default UploadProofForm;
