import useAxios from "@/hooks/useAxios";
import { Event } from "@/types/event";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useUpdateEvent = (id?: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: Partial<Event>) => {
      if (!id) {
        const { data } = await axiosInstance.patch(`/events/${id}`, payload);
        return data;
      }
      console.log("form update event", payload);
      console.log("Updating event ID:", id);
      console.log("Payload:", payload);

      const response = await axiosInstance.patch(`/events/${id}`, payload);
      return response.data;
    },
    onSuccess: async () => {
      toast.success("Update event Success");
      await queryClient.invalidateQueries({ queryKey: ["organizer event"] });
      router.refresh();
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useUpdateEvent;
