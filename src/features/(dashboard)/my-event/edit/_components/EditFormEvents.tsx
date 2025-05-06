"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useGetEventOrganizerBySlug from "@/hooks/api/event/useGetEventOrganizerBySlug";
import useUpdateEvent from "@/hooks/api/event/useUpdateEvent";
// Keep the types import but only use it for TypeScript typing
import { CategoryName, Location } from "@/types/event";
import { getChangedValues } from "@/utils/getChangedValue";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { UpdateEventSchema } from "../schema";

import dynamic from "next/dynamic";
const TiptapRichtextEditor = dynamic(
  () => import("@/components/TiptapRichtextEditor"),
  { ssr: false },
);

interface EditFormEventsProps {
  slug: string;
}

const VALID_CATEGORIES = {
  MUSIC: "MUSIC" as CategoryName,
  EDUCATION: "EDUCATION" as CategoryName,
  CULTURE: "CULTURE" as CategoryName,
  BUSINESS: "BUSINESS" as CategoryName,
  FASHION: "FASHION" as CategoryName,
  SPORT: "SPORT" as CategoryName,
};

const VALID_LOCATIONS = {
  JAKARTA: "JAKARTA" as Location,
  BANDUNG: "BANDUNG" as Location,
  SURABAYA: "SURABAYA" as Location,
  YOGYAKARTA: "YOGYAKARTA" as Location,
  SEMARANG: "SEMARANG" as Location,
};

interface EventFormValues {
  name: string;
  desc: string;
  startDate: string;
  endDate: string;
  category: string;
  location: string;
}

const formatDateForInput = (dateString: string | undefined): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  return date.toISOString().split("T")[0];
};

export const EditFormEvents: FC<EditFormEventsProps> = ({ slug }) => {
  const { data: event, isPending: isPendingGet } =
    useGetEventOrganizerBySlug(slug);
  const eventId = event?.id;
  const router = useRouter();
  const { mutateAsync: updateEvent, isPending: isPendingUpdate } =
    useUpdateEvent(eventId);
  const session = useSession();
  const user = session.data?.user;

  const [categoryValue, setCategoryValue] = useState<string>("");
  const [locationValue, setLocationValue] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const validateCategory = (
    category: string | undefined,
  ): CategoryName | "" => {
    if (!category) return "";
    return Object.values(VALID_CATEGORIES).includes(category as CategoryName)
      ? (category as CategoryName)
      : "";
  };

  const validateLocation = (location: string | undefined): Location | "" => {
    if (!location) return "";
    return Object.values(VALID_LOCATIONS).includes(location as Location)
      ? (location as Location)
      : "";
  };

  const initialValues: EventFormValues = {
    name: event?.name || "",
    desc: event?.desc || "",
    startDate: formatDateForInput(event?.startDate) || "",
    endDate: formatDateForInput(event?.endDate) || "",
    category: validateCategory(event?.category),
    location: validateLocation(event?.location),
  };

  const formik = useFormik<EventFormValues>({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: UpdateEventSchema,
    onSubmit: async (values) => {
      try {
        const formattedValues = {
          ...values,
          startDate: values.startDate
            ? new Date(values.startDate).toISOString()
            : "",
          endDate: values.endDate ? new Date(values.endDate).toISOString() : "",
        };

        const payload = {
          ...getChangedValues(formattedValues, {
            ...initialValues,
            startDate: event?.startDate || "",
            endDate: event?.endDate || "",
          }),
          id: event?.id,
          slug,
        };

        let formattedPayload: any = {
          ...payload,
        };

        if (payload.category) {
          if (
            !Object.values(VALID_CATEGORIES).includes(payload.category as any)
          ) {
            throw new Error(`Invalid category value: ${payload.category}`);
          }
          // Ensure it's typed correctly for the API
          formattedPayload.category = payload.category as CategoryName;
        }

        if (payload.location) {
          if (
            !Object.values(VALID_LOCATIONS).includes(payload.location as any)
          ) {
            throw new Error(`Invalid location value: ${payload.location}`);
          }
          formattedPayload.location = payload.location as Location;
        }

        console.log("Submitting payload:", formattedPayload);
        await updateEvent(formattedPayload);
        setIsDialogOpen(false);
        router.push(`/dashboard/my-event/${slug}/edit`);
      } catch (error) {
        console.error("Failed to update event:", error);
      }
    },
  });

  useEffect(() => {
    if (formik.values.startDate && formik.values.endDate) {
      const startDate = new Date(formik.values.startDate);
      const endDate = new Date(formik.values.endDate);

      if (endDate < startDate) {
        formik.setFieldError(
          "endDate",
          "End date cannot be earlier than start date",
        );
      }
    }
  }, [formik.values.startDate]);

  useEffect(() => {
    if (event) {
      console.log("Raw event data received:", event);
      console.log("Category from DB:", event.category);
      console.log("Location from DB:", event.location);

      if (event.category) {
        setCategoryValue(event.category);
      }

      if (event.location) {
        setLocationValue(event.location);
      }
    }
  }, [event]);

  useEffect(() => {
    if (formik.values.category) {
      setCategoryValue(formik.values.category);
    }
    if (formik.values.location) {
      setLocationValue(formik.values.location);
    }
  }, [formik.values.category, formik.values.location]);

  const handleSaveClick = () => {
    if (formik.isValid && formik.dirty) {
      setIsDialogOpen(true);
    }
  };

  if (isPendingGet) {
    return (
      <div className="flex h-64 items-center justify-center p-6">
        <div className="animate-pulse font-medium text-[#004DE8]">
          Loading event information...
        </div>
      </div>
    );
  }

  if (!event && !isPendingGet) {
    return (
      <div className="rounded-lg border border-red-100 bg-red-50 p-6 text-center text-red-600">
        Event not found
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800 dark:bg-gray-900">
      <h4 className="mb-6 border-b border-[#004DE8]/10 pb-3 text-lg font-semibold text-[#004DE8] dark:text-[#004DE8]/90">
        Event Information
      </h4>

      {!!user && (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-medium text-[#004DE8]/90">
              Event Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Event Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-gray-300 transition-all focus:border-[#004DE8] focus:ring focus:ring-[#004DE8]/20 dark:border-gray-700"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm font-medium text-red-500">
                {formik.errors.name}
              </p>
            )}
            <p className="text-xs font-light text-gray-500 dark:text-gray-400">
              Enter the full name of your event as it will appear to attendees.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div className="space-y-2">
              <Label
                htmlFor="location"
                className="font-medium text-[#004DE8]/90"
              >
                Location
              </Label>
              <Select
                value={formik.values.location}
                onValueChange={(value) =>
                  formik.setFieldValue("location", value)
                }
              >
                <SelectTrigger
                  id="location"
                  className="w-full border-gray-300 transition-all focus:border-[#004DE8] focus:ring focus:ring-[#004DE8]/20 dark:border-gray-700"
                >
                  <SelectValue placeholder="Select location">
                    {formik.values.location || "Select location"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="border-[#004DE8]/20">
                  {Object.values(VALID_LOCATIONS).map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {formik.touched.location && formik.errors.location && (
                <p className="text-sm font-medium text-red-500">
                  {formik.errors.location}
                </p>
              )}
              <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                Select the location for your event. If not changed, the last
                selected location will be used.
              </p>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="category"
                className="font-medium text-[#004DE8]/90"
              >
                Category
              </Label>
              <Select
                value={formik.values.category}
                onValueChange={(value) =>
                  formik.setFieldValue("category", value)
                }
              >
                <SelectTrigger
                  id="category"
                  className="w-full border-gray-300 transition-all focus:border-[#004DE8] focus:ring focus:ring-[#004DE8]/20 dark:border-gray-700"
                >
                  <SelectValue placeholder="Select category">
                    {formik.values.category || "Select category"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="border-[#004DE8]/20">
                  {Object.values(VALID_CATEGORIES).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.category && formik.errors.category && (
                <p className="text-sm font-medium text-red-500">
                  {formik.errors.category}
                </p>
              )}
              <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                Choose the category that best describes your event. If not
                selected, the last used category will be applied.
              </p>
            </div>
            {/* calendar start date */}
            <div className="space-y-2">
              <Label
                htmlFor="startDate"
                className="font-medium text-[#004DE8]/90"
              >
                Start Date
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formik.values.startDate}
                onChange={(e) => {
                  formik.setFieldValue("startDate", e.target.value);
                }}
                onBlur={formik.handleBlur}
                className="border-gray-300 transition-all focus:border-[#004DE8] focus:ring focus:ring-[#004DE8]/20 dark:border-gray-700"
              />
              {formik.touched.startDate && formik.errors.startDate && (
                <p className="text-sm font-medium text-red-500">
                  {formik.errors.startDate}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="endDate"
                className="font-medium text-[#004DE8]/90"
              >
                End Date
              </Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formik.values.endDate}
                min={formik.values.startDate} // Prevent selecting dates before the start date
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border-gray-300 transition-all focus:border-[#004DE8] focus:ring focus:ring-[#004DE8]/20 dark:border-gray-700"
              />
              {formik.touched.endDate && formik.errors.endDate && (
                <p className="text-sm font-medium text-red-500">
                  {formik.errors.endDate}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
            <Label
              htmlFor="desc"
              className="mb-2 block font-medium text-[#004DE8]/90"
            >
              Description
            </Label>
            <TiptapRichtextEditor
              key={event?.desc || ""}
              label="desc"
              field="desc"
              isTouch={formik.touched.desc}
              content={formik.values.desc}
              onChange={(value: string) => formik.setFieldValue("desc", value)}
              setError={formik.setFieldError}
              setTouch={formik.setFieldTouched}
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-6 dark:border-gray-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                formik.resetForm();
              }}
              className="border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={isPendingUpdate || !formik.isValid || !formik.dirty}
              onClick={handleSaveClick}
              className="bg-[#004DE8] text-white hover:bg-[#004DE8]/90"
            >
              {isPendingUpdate ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Event Update</DialogTitle>
            <DialogDescription>
              Are you sure you want to update this event? This will change the
              event details for all attendees.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={() => formik.handleSubmit()}
              disabled={isPendingUpdate}
              className="bg-[#004DE8] text-white hover:bg-[#004DE8]/90"
            >
              {isPendingUpdate ? "Saving..." : "Confirm Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
