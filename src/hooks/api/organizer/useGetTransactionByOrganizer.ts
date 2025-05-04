"use client";

import { axiosInstance } from "@/lib/axios";
import { TransactionWithTotal } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

const useGetTransactionByOrganizer = () => {
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  return useQuery({
    queryKey: ["transactionevents"],
    queryFn: async () => {
      if (!token) throw new Error("No access token found in session");

      const { data } = await axiosInstance.get<TransactionWithTotal>(
        `/organizers/transactions`,
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

export default useGetTransactionByOrganizer;
