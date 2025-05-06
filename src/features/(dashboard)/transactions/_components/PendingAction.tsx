// "use client";

// import { FC, useEffect, useState } from "react";
// import useGetTransactionByStatus from "@/hooks/api/organizer/useGetTransactionByStatus";
// import useUpdateTransaction from "@/hooks/api/transaction/useUpdateTransaction";
// import Image from "next/image";
// import { toast } from "sonner";
// import PaginationSection from "@/components/PaginationSection";

// interface Props {}

// const PendingTransactionList: FC<Props> = () => {
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 6;
//   const { data, isLoading } = useGetTransactionByStatus("WAITING_CONFIRMATION");
//   const transactions = data?.transactions || [];
//   const totalCount = data?.totalTransaction || 0;
//   const startIndex = (page - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const paginatedTransactions = transactions.slice(startIndex, endIndex);

//   useEffect(() => {
//     if (
//       page > 1 &&
//       paginatedTransactions.length === 0 &&
//       transactions.length > 0
//     ) {
//       setPage(1);
//     }
//   }, [transactions, page, paginatedTransactions.length]);

//   const onChangePage = (newPage: number) => {
//     setPage(newPage);
//   };
//   // State to handle transaction modal
//   const [showModal, setShowModal] = useState(false);
//   const [currentTransaction, setCurrentTransaction] = useState<any>(null);

//   // Initialize the update transaction mutation
//   const updateTransactionMutation = useUpdateTransaction(
//     currentTransaction?.uuid || "",
//   );

//   const handleViewTransaction = (transaction: any) => {
//     setCurrentTransaction(transaction);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setCurrentTransaction(null);
//   };

//   const handleAccept = () => {
//     if (!currentTransaction?.uuid) return;

//     updateTransactionMutation.mutate(
//       { uuid: currentTransaction.uuid, action: "accept" },
//       {
//         onSuccess: () => {
//           toast.success("Payment accepted successfully");
//           handleCloseModal();
//         },
//         onError: (error) => {
//           toast.error("Failed to accept payment");
//           console.error("Error accepting payment:", error);
//         },
//       },
//     );
//   };

//   const handleReject = () => {
//     if (!currentTransaction?.uuid) return;

//     updateTransactionMutation.mutate(
//       { uuid: currentTransaction.uuid, action: "reject" },
//       {
//         onSuccess: () => {
//           toast.success("Payment rejected");
//           handleCloseModal();
//         },
//         onError: (error) => {
//           toast.error("Failed to reject payment");
//           console.error("Error rejecting payment:", error);
//         },
//       },
//     );
//   };

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <>
//       <div className="overflow-hidden rounded-lg bg-white shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-50">
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                   Event Name
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                   Email
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                   Total Paid
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {paginatedTransactions.map((transaction) => (
//                 <tr key={transaction.uuid}>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     {transaction.transactionDetails[0].ticket.event.name ||
//                       "Unknown Event"}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     {transaction.user?.email || "-"}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     ${transaction.totalAmount?.toLocaleString() || "0"}
//                   </td>
//                   <td className="px-6 py-4 text-sm">
//                     <button
//                       onClick={() => handleViewTransaction(transaction)}
//                       className="rounded-md bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600"
//                     >
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {transactions.length === 0 && (
//                 <tr>
//                   <td colSpan={4}>
//                     <div className="flex flex-col items-center justify-center py-6 text-gray-500">
//                       <Image
//                         src="/pending.webp"
//                         alt="empty"
//                         width={120}
//                         height={180}
//                         className="mb-3"
//                       />
//                       <p className="mt-10 text-sm">
//                         No pending transactions found
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//         {transactions.length > itemsPerPage && (
//           <div className="flex justify-center py-6">
//             <PaginationSection
//               page={page}
//               total={totalCount}
//               take={itemsPerPage}
//               onChangePage={onChangePage}
//             />
//           </div>
//         )}
//       </div>

//       {/* Transaction Detail Modal */}
//       {showModal && currentTransaction && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/70 p-4">
//           <div className="scrollbar-hide relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-4 text-sm text-gray-600 shadow-2xl">
//             {/* Close Button */}
//             <button
//               onClick={handleCloseModal}
//               className="absolute top-3 right-3 text-gray-400 transition hover:text-gray-600"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>

//             {/* Header */}
//             <h3 className="mb-4 text-base font-semibold text-gray-800">
//               Transaction Details
//             </h3>

//             {/* Grid Info */}
//             <div className="grid grid-cols-2 gap-4">
//               {/* User Info */}
//               <div>
//                 <p className="mb-1 font-semibold text-gray-700">User Info</p>
//                 <p>Name: {currentTransaction.user?.fullName || "-"}</p>
//                 <p>Email: {currentTransaction.user?.email || "-"}</p>
//               </div>

//               {/* Transaction Info */}
//               <div>
//                 <p className="mb-1 font-semibold text-gray-700">Transaction</p>
//                 <p>UUID: {currentTransaction.uuid || "-"}</p>
//                 <p>
//                   Date:{" "}
//                   {new Date(currentTransaction.createdAt).toLocaleDateString(
//                     "en-US",
//                     {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     },
//                   )}
//                 </p>
//               </div>

//               {/* Payment */}
//               <div>
//                 <p className="mb-1 font-semibold text-gray-700">Payment</p>
//                 <p>
//                   Total Price: $
//                   {currentTransaction.totalAmount?.toLocaleString() || "0"}
//                 </p>
//                 <p>
//                   Voucher Used:{" "}
//                   {currentTransaction.voucher
//                     ? `$${currentTransaction.discountAmount?.toLocaleString() || "0"}`
//                     : "None"}
//                 </p>
//                 <p>
//                   Points Used:{" "}
//                   {currentTransaction.usePoints
//                     ? `${currentTransaction.pointsUsed} pts`
//                     : "None"}
//                 </p>
//                 <p className="font-semibold text-gray-800">
//                   Final Price: $
//                   {currentTransaction.totalAmount?.toLocaleString() || "0"}
//                 </p>
//               </div>

//               {/* Ticket */}
//               <div>
//                 <p className="mb-1 font-semibold text-gray-700">Ticket</p>
//                 <p>
//                   Quantity: {currentTransaction.transactionDetails[0].qty || 1}
//                 </p>
//                 <p>
//                   Type:{" "}
//                   {currentTransaction.transactionDetails[0].ticket
//                     ?.ticketType || "-"}
//                 </p>
//               </div>
//             </div>

//             {/* Ticket Types Table */}
//             {currentTransaction.tickets?.length > 0 && (
//               <div className="mt-4">
//                 <p className="mb-1 font-semibold text-gray-700">Ticket Types</p>
//                 <div className="scrollbar-hide max-h-40 overflow-y-auto rounded-md border border-gray-200">
//                   <table className="w-full text-xs">
//                     <thead className="bg-gray-50 text-left font-medium text-gray-500">
//                       <tr>
//                         <th className="px-3 py-2">Type</th>
//                         <th className="px-3 py-2">Qty</th>
//                         <th className="px-3 py-2">Price</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {currentTransaction.tickets.map(
//                         (ticket: any, index: number) => (
//                           <tr key={index}>
//                             <td className="px-3 py-2">
//                               {ticket.ticketType || "-"}
//                             </td>
//                             <td className="px-3 py-2">{ticket.qty || 1}</td>
//                             <td className="px-3 py-2">
//                               ${ticket.price?.toLocaleString() || "0"}
//                             </td>
//                           </tr>
//                         ),
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}

//             {/* Payment Proof */}
//             {currentTransaction.paymentProof && (
//               <div className="mt-4">
//                 <p className="mb-1 font-semibold text-gray-700">
//                   Payment Proof
//                 </p>
//                 <div className="h-48 w-full overflow-hidden rounded-lg border border-gray-200">
//                   <img
//                     src={currentTransaction.paymentProof}
//                     alt="Payment Proof"
//                     className="h-full w-full rounded-lg object-cover"
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="mt-4 flex justify-end gap-2">
//               <button
//                 onClick={handleReject}
//                 disabled={updateTransactionMutation.isPending}
//                 className="rounded-md bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 disabled:opacity-50"
//               >
//                 {updateTransactionMutation.isPending
//                   ? "Processing..."
//                   : "Reject Payment"}
//               </button>
//               <button
//                 onClick={handleAccept}
//                 disabled={updateTransactionMutation.isPending}
//                 className="rounded-md bg-[#004DE8] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#003bbf] disabled:opacity-50"
//               >
//                 {updateTransactionMutation.isPending
//                   ? "Processing..."
//                   : "Accept Payment"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PendingTransactionList;
"use client";

import { FC, useEffect, useState } from "react";
import useGetTransactionByStatus from "@/hooks/api/organizer/useGetTransactionByStatus";
import useUpdateTransaction from "@/hooks/api/transaction/useUpdateTransaction";
import Image from "next/image";
import { toast } from "sonner";
import PaginationSection from "@/components/PaginationSection";
import { Transaction } from "@/types/transaction";
import { useQueryState, parseAsInteger } from "nuqs";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "@/components/ui/input";

const PendingTransactionList = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debouncedSearch] = useDebounceValue(search, 500);

  const { data, isLoading, isError } = useGetTransactionByStatus(
    "WAITING_CONFIRMATION",
    {
      take: 6,
      page,
      sortBy: "createdAt",
      sortOrder: "desc",
      search: debouncedSearch,
    },
  );

  const transactions = data?.data?.transactions || [];
  const meta = data?.meta || { page: 1, take: 6, total: 0 };
  const totalTransactions = data?.data?.totalTransactions || 0;

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  // State to handle transaction modal
  const [showModal, setShowModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<any>(null);

  // Initialize the update transaction mutation
  const updateTransactionMutation = useUpdateTransaction(
    currentTransaction?.uuid || "",
  );

  const handleViewTransaction = (transaction: any) => {
    setCurrentTransaction(transaction);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentTransaction(null);
  };

  const handleAccept = () => {
    if (!currentTransaction?.uuid) return;

    updateTransactionMutation.mutate(
      { uuid: currentTransaction.uuid, action: "accept" },
      {
        onSuccess: () => {
          toast.success("Payment accepted successfully");
          handleCloseModal();
        },
        onError: (error) => {
          toast.error("Failed to accept payment");
          console.error("Error accepting payment:", error);
        },
      },
    );
  };

  const handleReject = () => {
    if (!currentTransaction?.uuid) return;

    updateTransactionMutation.mutate(
      { uuid: currentTransaction.uuid, action: "reject" },
      {
        onSuccess: () => {
          toast.success("Payment rejected");
          handleCloseModal();
        },
        onError: (error) => {
          toast.error("Failed to reject payment");
          console.error("Error rejecting payment:", error);
        },
      },
    );
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <Input
        className="mx-auto mt-4 w-full"
        placeholder="Search by event name, email..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Event Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Total Paid
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction: Transaction) => (
                <tr key={transaction.uuid}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transaction.transactionDetails[0].ticket.event.name ||
                      "Unknown Event"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transaction.user?.email || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ${transaction.totalAmount?.toLocaleString() || "0"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleViewTransaction(transaction)}
                      className="rounded-md bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={4}>
                    <div className="flex flex-col items-center justify-center py-6 text-gray-500">
                      <Image
                        src="/pending.webp"
                        alt="empty"
                        width={120}
                        height={180}
                        className="mb-3"
                      />
                      <p className="mt-10 text-sm">
                        No pending transactions found
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {totalTransactions > 0 && (
          <div className="flex justify-center py-6">
            <PaginationSection
              page={meta.page || 1}
              total={totalTransactions}
              take={meta.take || 6}
              onChangePage={onChangePage}
            />
          </div>
        )}
      </div>

      {/* Transaction Detail Modal */}
      {showModal && currentTransaction && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/70 p-4">
          <div className="scrollbar-hide relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-4 text-sm text-gray-600 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-400 transition hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <h3 className="mb-4 text-base font-semibold text-gray-800">
              Transaction Details
            </h3>

            {/* Grid Info */}
            <div className="grid grid-cols-2 gap-4">
              {/* User Info */}
              <div>
                <p className="mb-1 font-semibold text-gray-700">User Info</p>
                <p>Name: {currentTransaction.user?.fullName || "-"}</p>
                <p>Email: {currentTransaction.user?.email || "-"}</p>
              </div>

              {/* Transaction Info */}
              <div>
                <p className="mb-1 font-semibold text-gray-700">Transaction</p>
                <p>UUID: {currentTransaction.uuid || "-"}</p>
                <p>
                  Date:{" "}
                  {new Date(currentTransaction.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    },
                  )}
                </p>
              </div>

              {/* Payment */}
              <div>
                <p className="mb-1 font-semibold text-gray-700">Payment</p>
                <p>
                  Total Price: $
                  {currentTransaction.totalAmount?.toLocaleString() || "0"}
                </p>
                <p>
                  Voucher Used:{" "}
                  {currentTransaction.voucher
                    ? `$${currentTransaction.discountAmount?.toLocaleString() || "0"}`
                    : "None"}
                </p>
                <p>
                  Points Used:{" "}
                  {currentTransaction.usePoints
                    ? `${currentTransaction.pointsUsed} pts`
                    : "None"}
                </p>
                <p className="font-semibold text-gray-800">
                  Final Price: $
                  {currentTransaction.totalAmount?.toLocaleString() || "0"}
                </p>
              </div>

              {/* Ticket */}
              <div>
                <p className="mb-1 font-semibold text-gray-700">Ticket</p>
                <p>
                  Quantity: {currentTransaction.transactionDetails[0].qty || 1}
                </p>
                <p>
                  Type:{" "}
                  {currentTransaction.transactionDetails[0].ticket
                    ?.ticketType || "-"}
                </p>
              </div>
            </div>

            {/* Ticket Types Table */}
            {currentTransaction.tickets?.length > 0 && (
              <div className="mt-4">
                <p className="mb-1 font-semibold text-gray-700">Ticket Types</p>
                <div className="scrollbar-hide max-h-40 overflow-y-auto rounded-md border border-gray-200">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50 text-left font-medium text-gray-500">
                      <tr>
                        <th className="px-3 py-2">Type</th>
                        <th className="px-3 py-2">Qty</th>
                        <th className="px-3 py-2">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentTransaction.tickets.map(
                        (ticket: any, index: number) => (
                          <tr key={index}>
                            <td className="px-3 py-2">
                              {ticket.ticketType || "-"}
                            </td>
                            <td className="px-3 py-2">{ticket.qty || 1}</td>
                            <td className="px-3 py-2">
                              ${ticket.price?.toLocaleString() || "0"}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Payment Proof */}
            {currentTransaction.paymentProof && (
              <div className="mt-4">
                <p className="mb-1 font-semibold text-gray-700">
                  Payment Proof
                </p>
                <div className="h-48 w-full overflow-hidden rounded-lg border border-gray-200">
                  <img
                    src={currentTransaction.paymentProof}
                    alt="Payment Proof"
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleReject}
                disabled={updateTransactionMutation.isPending}
                className="rounded-md bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 disabled:opacity-50"
              >
                {updateTransactionMutation.isPending
                  ? "Processing..."
                  : "Reject Payment"}
              </button>
              <button
                onClick={handleAccept}
                disabled={updateTransactionMutation.isPending}
                className="rounded-md bg-[#004DE8] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#003bbf] disabled:opacity-50"
              >
                {updateTransactionMutation.isPending
                  ? "Processing..."
                  : "Accept Payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingTransactionList;
