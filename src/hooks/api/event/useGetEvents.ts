import useAxios from "@/hooks/useAxios";
import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetEventsQuery extends PaginationQueries {
  search?: string;
}

const useGetEvents = (queries?: GetEventsQuery) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["events", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Event>>(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/events`,
        { params: queries },
      );
      console.log(data);
      return data;
    },
  });
};

export default useGetEvents;
