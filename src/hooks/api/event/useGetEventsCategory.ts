import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetEventsCategory = (slug: string) => {
  return useQuery<PageableResponse<Event>>({
    queryKey: ["events", slug],
    queryFn: async () => {
      const response = await axiosInstance.get<PageableResponse<Event>>(
        `/events/category/${slug}`,
      );
      return response.data;
    },
  });
};

export default useGetEventsCategory;
