import { axiosInstance } from "@/lib/axios";
import { TransactionSummaryResponse } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useGetTransactionByStatus = (status: string) => {
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  return useQuery({
    queryKey: ["statustransactions", status],
    queryFn: async () => {
      if (!token) throw new Error("No access token found in session");

      const { data } = await axiosInstance.get<TransactionSummaryResponse>(
        `organizers/transactions?status=${status}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
  });
};

export default useGetTransactionByStatus;
