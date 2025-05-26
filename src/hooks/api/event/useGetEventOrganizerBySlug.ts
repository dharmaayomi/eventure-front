"use client";

import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useGetEventOrganizerBySlug = (slug: string) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  return useQuery<Event>({
    queryKey: ["eventsdetails", slug],
    queryFn: async () => {
      if (!token) throw new Error("No access token found in session");

      const { data } = await axiosInstance.get<Event>(
        `/organizers/events/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
    enabled: !!token && !!slug,
  });
};

export default useGetEventOrganizerBySlug;
