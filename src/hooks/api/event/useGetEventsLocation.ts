import { Event } from "@/types/event";
import { PageableResponse } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetEventsLocation = (slug: string) => {
  return useQuery<PageableResponse<Event>>({
    queryKey: ["events", slug],
    queryFn: async () => {
      const response = await axios.get<PageableResponse<Event>>(
        `http://localhost:9000/events/location/${slug}`,
      );
      return response.data;
    },
  });
};

export default useGetEventsLocation;
