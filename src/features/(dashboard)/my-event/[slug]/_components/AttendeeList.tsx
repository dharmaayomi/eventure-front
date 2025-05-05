"use client";

import useGetTransactionPerEventSummary from "@/hooks/api/organizer/useGetTransactionPerEventSummary";
import React, { FC } from "react";

interface Props {
  slug: string;
}

const AttendeeList: FC<Props> = ({ slug }) => {
  const { data, isLoading } = useGetTransactionPerEventSummary(slug);
  const transactions = data?.transactions || [];

  const now = new Date();
  const filteredTransactions = transactions.filter(
    (tx) => tx.status === "DONE" && new Date(tx.ticket.event.endDate) < now,
  );

  if (isLoading) return <p className="px-6 py-4">Loading...</p>;

  if (filteredTransactions.length === 0) {
    return (
      <div className="mt-6 rounded-lg bg-white p-6 text-gray-600 shadow-sm">
        Belum ada attendee karena event belum terlaksana atau tidak ada
        transaksi yang selesai.
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
            {filteredTransactions.map((tx, index) => {
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
                    {tx.ticket.ticketType}
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendeeList;
