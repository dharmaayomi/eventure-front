"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateEventPayload {
  categoryId: string;
  organizerId: string;
  slug: string;
  name: string;
  desc: string;
  startDate: string;
  endDate: string;
  thumbnail: File | null;
  location: string;
}

const useCreateEvent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateEventPayload) => {
      const createEventForm = new FormData();

      createEventForm.append("categoryId", payload.categoryId);
      createEventForm.append("organizerId", payload.organizerId);
      createEventForm.append("slug", payload.slug);
      createEventForm.append("name", payload.name);
      createEventForm.append("desc", payload.desc);
      createEventForm.append("startDate", payload.startDate);
      createEventForm.append("endDate", payload.endDate);
      createEventForm.append("thumbnail", payload.thumbnail!);
      createEventForm.append("location", payload.location);

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/events`,
        createEventForm,
      );
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
