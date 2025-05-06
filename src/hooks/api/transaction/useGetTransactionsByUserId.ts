import useAxios from "@/hooks/useAxios";
import { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

const useGetTransactionsByUserId = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Transaction[]>(`/transactions`);
      console.log("ini data tx user: ", data);
      return data;
    },
  });
};

export default useGetTransactionsByUserId;
