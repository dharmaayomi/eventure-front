import useAxios from "@/hooks/useAxios";
import { Event } from "@/types/event";
import { useQuery } from "@tanstack/react-query";

const useGetEvent = (slug: string) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["event", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Event>(`/events/${slug}`);
      return data;
    },
  });
};

export default useGetEvent;
