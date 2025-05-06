import useAxios from "@/hooks/useAxios";
import { Review } from "@/types/review";
import { useQuery } from "@tanstack/react-query";

const useGetReviews = (slug: string) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["reviews", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Review[]>(
        `/reviews/organizer/${slug}`,
      );
      return data;
    },
  });
};

export default useGetReviews;
