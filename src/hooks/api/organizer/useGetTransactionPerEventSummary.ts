"use client";

import { axiosInstance } from "@/lib/axios";
import {
  TransactionSummaryResponse,
  TransactionWithTotal,
} from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useGetTransactionPerEventSummary = (slug: string) => {
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  return useQuery({
    queryKey: ["transaction-detail-events", slug],
    queryFn: async () => {
      if (!token) throw new Error("No access token found in session");

      const { data } = await axiosInstance.get<TransactionSummaryResponse>(
        `/organizers/transactions/event/${slug}`,
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

export default useGetTransactionPerEventSummary;
