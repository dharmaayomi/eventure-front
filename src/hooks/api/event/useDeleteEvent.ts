import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useDeleteEvent = () => {
  const router = useRouter();
  const queryCLient = useQueryClient();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.delete(`/events/delete/${id}`);
      return data;
    },
    onSuccess: async () => {
      toast.success("Delete event success");
      await queryCLient.invalidateQueries({ queryKey: ["event"] });
      router.push("/dashboard/my-event");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useDeleteEvent;
