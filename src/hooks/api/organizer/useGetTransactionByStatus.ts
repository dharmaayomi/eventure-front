import { axiosInstance } from "@/lib/axios";
import { PaginationQueries } from "@/types/pagination";
import { TransactionSummaryResponse } from "@/types/transactionSummary";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface GetTransactionByStatysQuery extends PaginationQueries {
  search?: string;
}

interface Response {
  data: TransactionSummaryResponse;
  meta: {
    total: number;
    take: number;
    page: number;
  };
}

const useGetTransactionByStatus = (
  status: string,
  queries?: GetTransactionByStatysQuery,
) => {
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  return useQuery({
    queryKey: ["status-transactions", status, queries],
    queryFn: async () => {
      if (!token) throw new Error("No access token found in session");

      const { data } = await axiosInstance.get<Response>(
        `organizers/transactions?status=${status}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetTransactionByStatus;
