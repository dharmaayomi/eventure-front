import useAxios from "@/hooks/useAxios";
import { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

const useGetTransaction = (uuid: string) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["transaction", uuid],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Transaction>(
        `/transactions/detail/${uuid}`,
      );
      console.log("data useget:", data);
      return data;
    },
  });
};

export default useGetTransaction;
