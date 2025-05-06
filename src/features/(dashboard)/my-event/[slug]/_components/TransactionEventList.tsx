// "use client";

// import { FC, useState } from "react";
// import useGetTransactionPerEventSummary from "@/hooks/api/organizer/useGetTransactionPerEventSummary";
// import useUpdateTransaction from "@/hooks/api/transaction/useUpdateTransaction";
// import { toast } from "sonner";
// import PaymentProofModal from "./PaymentProofModal";

// interface Props {
//   slug: string;
// }

// const TransactionEventList: FC<Props> = ({ slug }) => {
//   const { data, isLoading } = useGetTransactionPerEventSummary(slug);
//   const transactions = data?.transactions || [];

//   // State to handle payment proof modal
//   const [showModal, setShowModal] = useState(false);
//   const [currentProof, setCurrentProof] = useState<string | null>(null);
//   const [currentTransactionId, setCurrentTransactionId] = useState<
//     string | null
//   >(null);
//   const [currentStatus, setCurrentStatus] = useState<string>("PENDING");

//   // Initialize the update transaction mutation
//   const updateTransactionMutation = useUpdateTransaction(
//     currentTransactionId || "",
//   );

//   const handleViewProof = (proof: string, uuid: string, status: string) => {
//     setCurrentProof(proof);
//     setCurrentTransactionId(uuid);
//     setCurrentStatus(status);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setCurrentProof(null);
//     setCurrentTransactionId(null);
//     setCurrentStatus("WAITING_FOR_PAYMENT");
//   };

//   const handleAccept = () => {
//     if (!currentTransactionId) return;

//     // Only allow accepting payments that are in WAITING_CONFIRMATION status
//     if (currentStatus !== "WAITING_CONFIRMATION") {
//       toast.error("Only transactions awaiting confirmation can be accepted");
//       return;
//     }

//     updateTransactionMutation.mutate(
//       { uuid: currentTransactionId, action: "accept" },
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
//     if (!currentTransactionId) return;

//     // Only allow rejecting payments that are in WAITING_CONFIRMATION status
//     if (currentStatus !== "WAITING_CONFIRMATION") {
//       toast.error("Only transactions awaiting confirmation can be rejected");
//       return;
//     }

//     updateTransactionMutation.mutate(
//       { uuid: currentTransactionId, action: "reject" },
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
//   // console.log("Transactions:", transactions);
//   console.log("Raw data from hook:", data);
//   console.log("Transactions extracted:", transactions);

//   return (
//     <>
//       <div className="overflow-hidden rounded-lg bg-white shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-50">
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                   ID
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                   Buyer
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                   Ticket
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                   Amount
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                   Date
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                   Status
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {transactions.map((transaction) => (
//                 <tr key={`${transaction.uuid}-${transaction.user?.id}`}>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     {transaction.ticketId}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     {transaction.user.fullName}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     {transaction.transactionDetails[0].ticket.ticketType}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     ${transaction.totalAmount.toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     {new Date(transaction.createdAt).toLocaleDateString(
//                       "en-US",
//                       {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       },
//                     )}
//                   </td>
//                   <td className="px-6 py-4 text-sm">
//                     <span
//                       className={`rounded-full px-2 py-1 text-xs ${
//                         transaction.status === "DONE"
//                           ? "bg-green-100 text-green-800"
//                           : transaction.status === "WAITING_CONFIRMATION"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : transaction.status === "WAITING_FOR_PAYMENT"
//                               ? "bg-blue-100 text-blue-800"
//                               : transaction.status === "REJECTED"
//                                 ? "bg-red-100 text-red-800"
//                                 : transaction.status === "EXPIRED" ||
//                                     transaction.status === "CANCELED"
//                                   ? "bg-gray-100 text-gray-800"
//                                   : "bg-gray-100 text-gray-800"
//                       }`}
//                     >
//                       {transaction.status.replace(/_/g, " ")}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm">
//                     <button
//                       onClick={() =>
//                         handleViewProof(
//                           transaction?.paymentProof || "",
//                           transaction.uuid,
//                           transaction.status,
//                         )
//                       }
//                       className="text-blue-500 hover:text-blue-700"
//                       disabled={!transaction?.paymentProof}
//                     >
//                       See Payment Proof
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Payment Proof Modal */}
//       <PaymentProofModal
//         show={showModal}
//         proofUrl={currentProof}
//         transactionId={currentTransactionId}
//         transactionStatus={currentStatus}
//         onClose={handleCloseModal}
//         onAccept={handleAccept}
//         onReject={handleReject}
//         isProcessing={updateTransactionMutation.isPending}
//       />
//     </>
//   );
// };

// export default TransactionEventList;

"use client";

import { FC, useState } from "react";
import useGetTransactionPerEventSummary from "@/hooks/api/organizer/useGetTransactionPerEventSummary";
import useUpdateTransaction from "@/hooks/api/transaction/useUpdateTransaction";
import { toast } from "sonner";
import PaymentProofModal from "./PaymentProofModal";
import PaginationSection from "@/components/PaginationSection";

import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";
import { TransactionSummaryResponse } from "@/types/transactionSummary";
interface Props {
  slug: string;
}

const TransactionEventList: FC<Props> = ({ slug }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Correctly apply the hook with the slug parameter
  const { data, isLoading, isError } = useGetTransactionPerEventSummary(slug);

  // Safely extract transactions from data based on the actual response structure
  const transactionSummary = data as TransactionSummaryResponse | undefined;
  const transactions = transactionSummary?.transactions || [];
  const totalCount = transactionSummary?.totalTransactions || 0;

  // Calculate pagination indexes
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // // Create a slice of transactions for the current page
  const paginatedTransactions = transactions.slice(startIndex, endIndex);
  // State to handle payment proof modal
  const [showModal, setShowModal] = useState(false);
  const [currentProof, setCurrentProof] = useState<string | null>(null);
  const [currentTransactionId, setCurrentTransactionId] = useState<
    string | null
  >(null);
  const [currentStatus, setCurrentStatus] = useState<string>("PENDING");

  // Initialize the update transaction mutation
  const updateTransactionMutation = useUpdateTransaction(
    currentTransactionId || "",
  );

  const handleViewProof = (proof: string, uuid: string, status: string) => {
    setCurrentProof(proof);
    setCurrentTransactionId(uuid);
    setCurrentStatus(status);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProof(null);
    setCurrentTransactionId(null);
    setCurrentStatus("WAITING_FOR_PAYMENT");
  };

  const handleAccept = () => {
    if (!currentTransactionId) return;

    // Only allow accepting payments that are in WAITING_CONFIRMATION status
    if (currentStatus !== "WAITING_CONFIRMATION") {
      toast.error("Only transactions awaiting confirmation can be accepted");
      return;
    }

    updateTransactionMutation.mutate(
      { uuid: currentTransactionId, action: "accept" },
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
    if (!currentTransactionId) return;

    // Only allow rejecting payments that are in WAITING_CONFIRMATION status
    if (currentStatus !== "WAITING_CONFIRMATION") {
      toast.error("Only transactions awaiting confirmation can be rejected");
      return;
    }

    updateTransactionMutation.mutate(
      { uuid: currentTransactionId, action: "reject" },
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

  // Handle pagination
  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };
  // const onChangePage = (page: number) => {
  //   setPage(page);
  // };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading transactions</p>;

  console.log("Raw data from hook:", data);
  console.log("Transactions extracted:", transactions);

  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Buyer
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Ticket
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.length > 0 ? (
                paginatedTransactions.map((transaction) => (
                  <tr key={`${transaction.uuid}-${transaction.user?.id}`}>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {transaction.ticketId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {transaction.user.fullName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {transaction.transactionDetails[0]?.ticket.ticketType ||
                        "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ${transaction.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(transaction.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          transaction.status === "DONE"
                            ? "bg-green-100 text-green-800"
                            : transaction.status === "WAITING_CONFIRMATION"
                              ? "bg-yellow-100 text-yellow-800"
                              : transaction.status === "WAITING_FOR_PAYMENT"
                                ? "bg-blue-100 text-blue-800"
                                : transaction.status === "REJECTED"
                                  ? "bg-red-100 text-red-800"
                                  : transaction.status === "EXPIRED" ||
                                      transaction.status === "CANCELED"
                                    ? "bg-gray-100 text-gray-800"
                                    : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {transaction.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() =>
                          handleViewProof(
                            transaction?.paymentProof || "",
                            transaction.uuid,
                            transaction.status,
                          )
                        }
                        className="text-blue-500 hover:text-blue-700"
                        disabled={!transaction?.paymentProof}
                      >
                        See Payment Proof
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}

        {totalCount > itemsPerPage && (
          <div className="flex justify-center py-6">
            <PaginationSection
              page={page}
              total={totalCount}
              take={itemsPerPage}
              onChangePage={onChangePage}
            />
          </div>
        )}
      </div>

      {/* Payment Proof Modal */}
      <PaymentProofModal
        show={showModal}
        proofUrl={currentProof}
        transactionId={currentTransactionId}
        transactionStatus={currentStatus}
        onClose={handleCloseModal}
        onAccept={handleAccept}
        onReject={handleReject}
        isProcessing={updateTransactionMutation.isPending}
      />
    </>
  );
};

export default TransactionEventList;
