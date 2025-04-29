import { Event } from "@/types/event";
import { PageableResponse } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetEvents = () => {
  return useQuery<PageableResponse<Event>>({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await axios.get<PageableResponse<Event>>(
        "http://localhost:8000/events",
      );
      return response.data;
    },
  });
};

export default useGetEvents;
