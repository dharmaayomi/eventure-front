"use client";

import useAxios from "@/hooks/useAxios";
import { CategoryName } from "@/types/event";
import { Organizer } from "@/types/organizer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateEventPayload {
  category: CategoryName;
  name: string;
  desc: string;
  startDate: Date;
  endDate: Date;
  thumbnail: File | null;
  location: string;
}

const useCreateEvent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateEventPayload) => {
      const createEventForm = new FormData();
      const startDateString =
        payload.startDate instanceof Date && !isNaN(payload.startDate.getTime())
          ? format(payload.startDate, "yyyy-MM-dd")
          : "";

      const endDateString =
        payload.endDate instanceof Date && !isNaN(payload.endDate.getTime())
          ? format(payload.endDate, "yyyy-MM-dd")
          : "";

      createEventForm.append("category", payload.category);
      createEventForm.append("name", payload.name.toLocaleLowerCase());
      createEventForm.append("desc", payload.desc);
      createEventForm.append("startDate", startDateString);
      createEventForm.append("endDate", endDateString);
      createEventForm.append("thumbnail", payload.thumbnail!);
      createEventForm.append("location", payload.location);

      const { data } = await axiosInstance.post(`/events`, createEventForm);
      return data;
    },
    onSuccess: async () => {
      toast.success("Create event success");
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useCreateEvent;
