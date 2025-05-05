// "use client";

// import useGetTransactionPerEventSummary from "@/hooks/api/organizer/useGetTransactionPerEventSummary";
// import { FC } from "react";

// interface Props {
//   onViewProof: (proof: string) => void;
//   slug: string;
// }

// const TransactionEventList: FC<Props> = ({ onViewProof, slug }) => {
//   const { data, isLoading } = useGetTransactionPerEventSummary(slug);
//   const transactions = data?.transactions || [];

//   if (isLoading) return <p>Loading...</p>;
//   console.log("this is transaction", transactions);

//   return (
//     <div className="overflow-hidden rounded-lg bg-white shadow-sm">
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                 ID
//               </th>
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                 Buyer
//               </th>
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                 Ticket
//               </th>
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                 Amount
//               </th>
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                 Date
//               </th>
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                 Status
//               </th>
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {transactions.map((transaction) => (
//               <tr key={`${transaction.uuid}-${transaction.user?.id}`}>
//                 <td className="px-6 py-4 text-sm text-gray-900">
//                   {transaction.ticketId}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-900">
//                   {transaction.user.fullName}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-900">
//                   {transaction.ticket.ticketType}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-900">
//                   ${transaction.totalAmount.toLocaleString()}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-900">
//                   {new Date(transaction.createdAt).toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "short",
//                     day: "numeric",
//                   })}
//                 </td>
//                 <td className="px-6 py-4 text-sm">
//                   <span
//                     className={`rounded-full px-2 py-1 text-xs ${
//                       transaction.status === "DONE"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {transaction.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-sm">
//                   <button
//                     onClick={() => onViewProof(transaction?.paymentProof || "")}
//                     className="text-blue-500 hover:text-blue-700"
//                   >
//                     See Payment Proof
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TransactionEventList;
"use client";

import { FC, useState } from "react";
import useGetTransactionPerEventSummary from "@/hooks/api/organizer/useGetTransactionPerEventSummary";
import useUpdateTransaction from "@/hooks/api/transaction/useUpdateTransaction";
import { toast } from "sonner";
import PaymentProofModal from "./PaymentProofModal";

interface Props {
  slug: string;
}

const TransactionEventList: FC<Props> = ({ slug }) => {
  const { data, isLoading } = useGetTransactionPerEventSummary(slug);
  const transactions = data?.transactions || [];

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

  if (isLoading) return <p>Loading...</p>;

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
              {transactions.map((transaction) => (
                <tr key={`${transaction.uuid}-${transaction.user?.id}`}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transaction.ticketId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transaction.user.fullName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transaction.ticket.ticketType}
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
              ))}
            </tbody>
          </table>
        </div>
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
