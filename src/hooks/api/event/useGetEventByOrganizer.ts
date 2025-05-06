"use client";
import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface GetEventByOrganizerQuery extends PaginationQueries {
  search?: string;
}

const useGetEventByOrganizer = (queries?: GetEventByOrganizerQuery) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ["organizerevents", queries],
    queryFn: async () => {
      if (!token) throw new Error("No access token found in session");

      const { data } = await axiosInstance.get<PageableResponse<Event>>(
        `/organizers/events`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: queries,
        },
      );
      return data;
    },
    enabled: !!token,
  });
};

export default useGetEventByOrganizer;
