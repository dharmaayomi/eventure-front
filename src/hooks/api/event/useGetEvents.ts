import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetEvents = (queries?: PaginationQueries) => {
  return useQuery<PageableResponse<Event>>({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await axios.get<PageableResponse<Event>>(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/events`,
      );
      return response.data;
    },
  });
};

export default useGetEvents;
