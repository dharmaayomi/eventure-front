"use client";

import TiptapRichtextEditor from "@/components/TiptapRichtextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCreateEvent from "@/hooks/api/event/useCreateEvent";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { CreateEventSchema } from "../schemas";

const CreateEventForm = () => {
  const { mutateAsync: createEvent, isPending } = useCreateEvent();

  const formik = useFormik({
    initialValues: {
      categoryId: "",
      organizerId: "",
      slug: "",
      name: "",
      desc: "",
      startDate: "",
      endDate: "",
      thumbnail: null,
      location: "",
    },
    validationSchema: CreateEventSchema,
    onSubmit: async (values) => {
      await createEvent(values);
    },
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailRef = useRef<HTMLInputElement>(null);

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget?.files?.[0];

    if (files) {
      formik.setFieldValue("thumbnail", files);
      setSelectedImage(URL.createObjectURL(files));
    }
  };

  const removeThumbnail = () => {
    formik.setFieldValue("thumbnail", null);
    setSelectedImage("");
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  console.log(formik.errors);
  return (
    <form className="mt-10 space-y-4" onSubmit={formik.handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="categoryId">categoryId</Label>
        <Input
          id="categoryId"
          name="categoryId"
          type="text"
          placeholder="categoryId"
          required
          value={formik.values.categoryId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.categoryId && !!formik.errors.categoryId && (
          <p className="text-xs text-red-500">{formik.errors.categoryId}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="organizerId">organizerId</Label>
        <Input
          id="organizerId"
          name="organizerId"
          type="text"
          placeholder="organizerId"
          required
          value={formik.values.organizerId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.organizerId && !!formik.errors.organizerId && (
          <p className="text-xs text-red-500">{formik.errors.organizerId}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="name">name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="name"
          required
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && !!formik.errors.name && (
          <p className="text-xs text-red-500">{formik.errors.name}</p>
        )}
      </div>

      <TiptapRichtextEditor
        label="desc"
        field="desc"
        isTouch={formik.touched.desc}
        content={formik.values.desc}
        onChange={(value: string) => formik.setFieldValue("desc", value)}
        setError={formik.setFieldError}
        setTouch={formik.setFieldTouched}
      />

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
        <Label htmlFor="location">location</Label>
        <Input
          id="location"
          name="location"
          type="text"
          placeholder="location"
          required
          value={formik.values.location}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.location && !!formik.errors.location && (
          <p className="text-xs text-red-500">{formik.errors.location}</p>
        )}
      </div>

      {selectedImage ? (
        <>
          <div className="relative h-[150px] w-[200px]">
            <Image
              src={selectedImage}
              alt="thumbnail"
              className="object-cover"
              fill
            />
          </div>
          <Button variant="destructive" type="button" onClick={removeThumbnail}>
            Remove
          </Button>
        </>
      ) : (
        <div className="grid gap-2">
          <Label htmlFor="thumbnail">Thumbnail</Label>
          <Input
            ref={thumbnailRef}
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={onChangeThumbnail}
          />
          {formik.touched.thumbnail && !!formik.errors.thumbnail && (
            <p className="text-xs text-red-500">{formik.errors.thumbnail}</p>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Loading" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default CreateEventForm;
