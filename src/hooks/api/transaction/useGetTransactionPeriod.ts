import { axiosInstance } from "@/lib/axios";
import { TransactionStatsResponse } from "@/types/transactionPeriod";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

const useGetTransactionPeriod = (period: string) => {
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  return useQuery({
    queryKey: ["transactionperiod", period],
    queryFn: async () => {
      if (!token) throw new Error("No access token found in session");

      const { data } = await axiosInstance.get<TransactionStatsResponse>(
        `/organizers/transaction-stats?period=${period}`,
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

export default useGetTransactionPeriod;
