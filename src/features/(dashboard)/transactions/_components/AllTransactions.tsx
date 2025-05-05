"use client";

import { FC } from "react";
import useGetTransactionByOrganizer from "@/hooks/api/organizer/useGetTransactionByOrganizer";

const AllTransactions: FC = () => {
  const { data, isLoading } = useGetTransactionByOrganizer();
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
                Quantity
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.uuid}>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {transaction.tickets?.event?.name}
                </td>

                <td className="px-6 py-4 text-sm text-gray-900">
                  {transaction.user?.email || "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {transaction.transactionDetails?.reduce(
                    (acc, td) => acc + td.qty,
                    0,
                  ) ?? 1}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${
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
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  ${transaction.totalAmount?.toLocaleString() || "0"}
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTransactions;
