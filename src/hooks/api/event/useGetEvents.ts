import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface GetEventsQuery extends PaginationQueries {
  search?: string;
}

const useGetEvents = (queries?: GetEventsQuery) => {
  return useQuery({
    queryKey: ["events", queries],
    queryFn: async () => {
      const { data } = await axios.get<PageableResponse<Event>>(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/events`,
        { params: queries },
      );
      console.log(data);
      return data;
    },
  });
};

export default useGetEvents;
