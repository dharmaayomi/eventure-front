"use client";

import TiptapRichtextEditor from "@/components/TiptapRichtextEditor";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useCreateEvent from "@/hooks/api/event/useCreateEvent";
import { cn } from "@/lib/utils";
import { CategoryName } from "@/types/event";
import { Location } from "@/types/location";
import { format } from "date-fns";
import { useFormik } from "formik";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { CreateEventSchema } from "../schemas";

const CreateEventForm = () => {
  const { mutateAsync: createEvent, isPending } = useCreateEvent();

  const formik = useFormik({
    initialValues: {
      category: "" as CategoryName,
      name: "",
      desc: "",
      startDate: new Date(),
      endDate: new Date(),
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
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h1 className="text-2xl font-semibold">Create New Event</h1>
      <form className="mt-10 space-y-4" onSubmit={formik.handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            required
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="rounded-md border border-gray-200 shadow-2xs"
          >
            <option value="" disabled>
              Select Category
            </option>

            {Object.entries(CategoryName).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>

          {formik.touched.category && !!formik.errors.category && (
            <p className="text-xs text-red-500">{formik.errors.category}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="name">Event Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Event Name / Title"
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
          label="Event Description"
          field="desc"
          isTouch={formik.touched.desc}
          content={formik.values.desc}
          onChange={(value: string) => formik.setFieldValue("desc", value)}
          setError={formik.setFieldError}
          setTouch={formik.setFieldTouched}
        />

        {/* START DATE */}
        <div className="grid gap-2">
          <Label htmlFor="startDate">Start Date of Event</Label>

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
          <Label htmlFor="endDate">End Date of Event</Label>

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

        {/* LOCATION */}
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <select
            id="location"
            name="location"
            required
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="rounded-md border border-gray-200 shadow-2xs"
          >
            <option value="" disabled>
              Select Location
            </option>

            {Object.entries(Location).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>

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
            <Button
              variant="destructive"
              type="button"
              onClick={removeThumbnail}
            >
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
    </div>
  );
};

export default CreateEventForm;
