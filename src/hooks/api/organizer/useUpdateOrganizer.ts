import { axiosInstance } from "@/lib/axios";
import { Organizer } from "@/types/organizer";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useUpdateOrganizer = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useMutation({
    mutationFn: async (payload: Partial<Organizer>) => {
      const response = await axiosInstance.patch(
        `/organizers/update`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Update organizer Success");
      router.push("/dashboard/organizer");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || "Failed to update organizer");
    },
  });
};

export default useUpdateOrganizer;
