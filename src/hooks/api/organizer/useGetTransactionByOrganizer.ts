// "use client";

// import { axiosInstance } from "@/lib/axios";
// import { PageableResponse, PaginationQueries } from "@/types/pagination";
// import { TransactionSummaryResponse } from "@/types/transactionSummary";
// import { useQuery } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";

// interface GetEventByOrganizerQuery extends PaginationQueries {
//   search?: string;
// }

// const useGetTransactionByOrganizer = () => {
//   const session = useSession();
//   const token = session?.data?.user?.accessToken;
//   return useQuery({
//     queryKey: ["transactionevents"],
//     queryFn: async () => {
//       if (!token) throw new Error("No access token found in session");

//       const { data } = await axiosInstance.get<TransactionSummaryResponse>(
//         `/organizers/transactions`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       return data;
//     },
//   });
// };

// export default useGetTransactionByOrganizer;

"use client";

import { axiosInstance } from "@/lib/axios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { TransactionSummaryResponse } from "@/types/transactionSummary";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface GetTransactionsByOrganizerQuery extends PaginationQueries {
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

const useGetTransactionByOrganizer = (
  queries?: GetTransactionsByOrganizerQuery,
) => {
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  return useQuery({
    queryKey: ["transactionandevents", queries],
    queryFn: async () => {
      if (!token) throw new Error("No access token found in session");

      const { data } = await axiosInstance.get<Response>(
        `/organizers/transactions`,
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

export default useGetTransactionByOrganizer;
