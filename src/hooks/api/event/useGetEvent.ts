import { Event } from "@/types/event";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetEvent = (slug: string) => {
  return useQuery({
    queryKey: ["event", slug],
    queryFn: async () => {
      const { data } = await axios.get<Event>(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/events/${slug}`,
      );
      return data;
    },
  });
};

export default useGetEvent;
