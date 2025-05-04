"use client";

import { FC } from "react";
import useGetTransactionByStatus from "@/hooks/api/organizer/useGetTransactionByStatus";
import Image from "next/image";

interface Props {
  onViewProof: (proof: string) => void;
}

const PendingTransactionList: FC<Props> = ({ onViewProof }) => {
  const { data, isLoading } = useGetTransactionByStatus("WAITING_CONFIRMATION");
  const transactions = data?.transactions || [];

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Event
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Payment Method
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Qty
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Total Ticket Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Voucher Used
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Point Used
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Final Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.uuid}>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {transaction.ticket.event.name || "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {transaction.user?.email || "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {transaction.totalAmount || "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {transaction.ticket.qty || 1}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  ${transaction.totalAmount}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {transaction.totalAmount
                    ? `$${transaction.totalAmount.toLocaleString()}`
                    : "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {transaction.usePoints ? `${transaction.usePoints} pts` : "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  ${transaction.totalAmount?.toLocaleString() || "0"}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => onViewProof(transaction?.paymentProof || "")}
                    className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                  >
                    View Proof
                  </button>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan={9}>
                  <div className="flex flex-col items-center justify-center py-6 text-gray-500">
                    <Image
                      src="/pending.webp"
                      alt="empty"
                      width={120} // Ukuran dikurangi
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
    </div>
  );
};

export default PendingTransactionList;
