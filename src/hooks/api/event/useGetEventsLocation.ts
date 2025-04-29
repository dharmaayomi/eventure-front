import { Event } from "@/types/event";
import { PageableResponse } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetEventsLocation = (slug: string) => {
  return useQuery<PageableResponse<Event>>({
    queryKey: ["events", slug],
    queryFn: async () => {
      const response = await axios.get<PageableResponse<Event>>(

        `${process.env.NEXT_PUBLIC_BASE_API_URL}/events/location/${slug}`,

      );
      return response.data;
    },
  });
};

export default useGetEventsLocation;
