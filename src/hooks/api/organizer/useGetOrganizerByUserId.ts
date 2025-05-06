"use client";

import { axiosInstance } from "@/lib/axios";
import { Organizer } from "@/types/organizer";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useGetOrganizerByUserId = (id: number) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["organizerprofile", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Organizer>(`/organizers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    enabled: !!token,
  });
};

export default useGetOrganizerByUserId;
