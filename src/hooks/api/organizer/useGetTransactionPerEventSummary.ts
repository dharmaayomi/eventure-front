"use client";

import { axiosInstance } from "@/lib/axios";
import { TransactionSummaryResponse } from "@/types/transactionSummary";
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
// "use client";

// import { axiosInstance } from "@/lib/axios";
// import { PageableResponse, PaginationQueries } from "@/types/pagination";
// import { TransactionSummaryResponse } from "@/types/transactionSummary";
// import { useQuery } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";

// interface GetEventByOrganizerQuery extends PaginationQueries {
//   search?: string;
// }

// const useGetTransactionPerEventSummary = (
//   slug: string,
//   queries: GetEventByOrganizerQuery,
// ) => {
//   const session = useSession();
//   const token = session?.data?.user?.accessToken;
//   return useQuery({
//     queryKey: ["transaction-detail-events", slug, queries],
//     queryFn: async () => {
//       if (!token) throw new Error("No access token found in session");

//       const { data } = await axiosInstance.get<
//         PageableResponse<TransactionSummaryResponse>
//       >(`/organizers/transactions/event/${slug}`, {
//         params: queries,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return data;
//     },
//   });
// };

// export default useGetTransactionPerEventSummary;
