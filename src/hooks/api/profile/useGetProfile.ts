import useAxios from "@/hooks/useAxios";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useGetProfile = (id: number) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  return useQuery({
    queryKey: ["profile"],
    enabled: !!id && !!token,
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/profiles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
  });
};

export default useGetProfile;
