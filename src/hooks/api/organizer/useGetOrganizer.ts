import useAxios from "@/hooks/useAxios";
import { Organizer } from "@/types/organizer";
import { useQuery } from "@tanstack/react-query";

const useGetOrganizer = (slug: string) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["organizer", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Organizer>(
        `/organizers/detail/${slug}`,
      );
      return data;
    },
  });
};

export default useGetOrganizer;
