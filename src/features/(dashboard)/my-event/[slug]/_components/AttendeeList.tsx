// "use client";

// import useGetTransactionPerEventSummary from "@/hooks/api/organizer/useGetTransactionPerEventSummary";
// import { TransactionSummaryResponse } from "@/types/transaction";
// import React, { FC, useState } from "react";
// import { parseAsInteger, useQueryState } from "nuqs";
// import { useDebounceValue } from "usehooks-ts";

// interface Props {
//   slug: string;
// }

// const AttendeeList: FC<Props> = ({ slug }) => {
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 6;
//   const { data, isLoading, isError } = useGetTransactionPerEventSummary(slug);

//   const transactionSummary = data as TransactionSummaryResponse | undefined;
//   const transactions = transactionSummary?.transactions || [];

//   const startIndex = (page - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const paginatedTransactions = transactions.slice(startIndex, endIndex);

//   const onChangePage = (page: number) => {
//     setPage(page);
//   };

//   const now = new Date();
//   const filteredTransactions = transactions.filter(
//     (tx) =>
//       tx.status === "DONE" &&
//       new Date(tx.transactionDetails[0].ticket.event.endDate) < now,
//   );

//   if (isLoading) return <p className="px-6 py-4">Loading...</p>;

//   if (filteredTransactions.length === 0) {
//     return (
//       <div className="mt-6 rounded-lg bg-white p-6 text-center text-gray-600 shadow-sm">
//         No attendees yet — either the event hasn’t happened or there are no
//         completed transactions.
//       </div>
//     );
//   }

//   return (
//     <div className="mt-6 overflow-hidden rounded-lg bg-white shadow-sm">
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                 Name
//               </th>
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                 Email
//               </th>
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                 Ticket
//               </th>
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                 Qty
//               </th>
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                 Total Paid
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {paginatedTransactions.map((tx, index) => {
//               const totalQty =
//                 tx.transactionDetails.reduce(
//                   (sum, detail) => sum + detail.qty,
//                   0,
//                 ) || 0;

//               return (
//                 <tr key={`${tx.ticketId}-${tx.user?.id}-${index}`}>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     {tx.user?.fullName}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     {tx.user?.email}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     {tx.ticket.ticketType}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     {totalQty}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     ${tx.totalAmount.toLocaleString()}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AttendeeList;
"use client";

import PaginationSection from "@/components/PaginationSection";
import useGetTransactionPerEventSummary from "@/hooks/api/organizer/useGetTransactionPerEventSummary";
import { TransactionSummaryResponse } from "@/types/transactionSummary";
import { parseAsInteger, useQueryState } from "nuqs";
import { FC, useEffect } from "react";

interface Props {
  slug: string;
}

const AttendeeList: FC<Props> = ({ slug }) => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const itemsPerPage = 6; // Define the items per page

  const { data, isLoading, isError } = useGetTransactionPerEventSummary(slug);

  const transactionSummary = data as TransactionSummaryResponse | undefined;
  const transactions = transactionSummary?.transactions || [];

  const now = new Date();
  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.status === "DONE" &&
      new Date(tx.transactionDetails[0].ticket.event.endDate) < now,
  );

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    endIndex,
  );
  const totalCount = filteredTransactions.length;

  useEffect(() => {
    if (
      page > 1 &&
      paginatedTransactions.length === 0 &&
      filteredTransactions.length > 0
    ) {
      setPage(1);
    }
  }, [filteredTransactions, page, paginatedTransactions.length, setPage]);

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <p className="px-6 py-4">Loading...</p>;

  if (filteredTransactions.length === 0) {
    return (
      <div className="mt-6 rounded-lg bg-white p-6 text-center text-gray-600 shadow-sm">
        No attendees yet — either the event hasn't happened or there are no
        completed transactions.
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Ticket
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Qty
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Total Paid
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedTransactions.map((tx, index) => {
              const totalQty =
                tx.transactionDetails.reduce(
                  (sum, detail) => sum + detail.qty,
                  0,
                ) || 0;

              return (
                <tr key={`${tx.ticketId}-${tx.user?.id}-${index}`}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {tx.user?.fullName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {tx.user?.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {tx.transactionDetails[0].ticket.ticketType}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {totalQty}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ${tx.totalAmount.toLocaleString()}
                  </td>
                </tr>
              );
            })}
            {paginatedTransactions.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No attendees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {filteredTransactions.length > itemsPerPage && (
        <div className="flex justify-center py-6">
          <PaginationSection
            page={page}
            total={totalCount}
            take={itemsPerPage}
            onChangePage={onChangePage}
          />
        </div>
      )}

      {/* Debug info - remove in production */}
      {/* {process.env.NODE_ENV !== "production" && (
        <div className="p-2 text-xs text-gray-500">
          Total: {totalCount}, Items per page: {itemsPerPage}, Current page:{" "}
          {page}, Filtered Transactions: {filteredTransactions.length}
        </div>
      )} */}
    </div>
  );
};

export default AttendeeList;
