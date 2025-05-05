import useAxios from "@/hooks/useAxios";
import { CategoryName, EventWithTransaction } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetEventsQuery extends PaginationQueries {
  search?: string;
  category?: CategoryName;
}

const useGetEvents = (queries?: GetEventsQuery) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["events", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        PageableResponse<EventWithTransaction>
      >(`/events`, { params: queries });
      console.log(data);
      return data;
    },
  });
};

export default useGetEvents;
