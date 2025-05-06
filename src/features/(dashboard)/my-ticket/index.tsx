"use client";

import useGetTransactionsByUserId from "@/hooks/api/transaction/useGetTransactionsByUserId";
import Link from "next/link";
import { format } from "date-fns";

const MyTicketPage = () => {
  const { data: transactions, isPending, error } = useGetTransactionsByUserId();

  if (isPending) return <div className="p-6 text-center">Loading...</div>;
  if (error)
    return (
      <div className="p-6 text-center text-red-500">Something went wrong!</div>
    );
  if (!transactions || transactions.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        You don’t have any tickets yet.
      </div>
    );
  }

  const rupiah = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-indigo-700">My Tickets</h1>

      <div className="space-y-6">
        {transactions.map((transaction) => (
          <div
            key={transaction.uuid}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-2 flex flex-col justify-between sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Transaction: {transaction.uuid}
                </h2>
                <p className="text-sm text-gray-600">
                  Date:{" "}
                  {format(
                    new Date(transaction.createdAt),
                    "dd MMM yyyy, HH:mm",
                  )}
                </p>
              </div>
              <span
                className={`mt-2 inline-block rounded-md px-3 py-1 text-sm font-medium sm:mt-0 ${
                  transaction.status === "DONE"
                    ? "bg-green-100 text-green-700"
                    : transaction.status === "WAITING_FOR_PAYMENT"
                      ? "bg-amber-100 text-amber-700"
                      : transaction.status === "WAITING_CONFIRMATION"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                }`}
              >
                {transaction.status.replaceAll("_", " ")}
              </span>
            </div>

            <ul className="mt-4 divide-y divide-gray-100">
              {transaction.transactionDetails.map((tx) => (
                <li
                  key={tx.id}
                  className="flex items-start justify-between py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {tx.ticket.event.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {tx.ticket.ticketType}
                    </p>
                    <p className="text-sm text-gray-400">Qty: {tx.qty}</p>
                  </div>
                  <p className="text-sm font-bold text-green-600">
                    {rupiah(tx.ticket.price * tx.qty)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-4 text-right text-sm text-gray-700">
              Total:{" "}
              <span className="font-bold text-green-700">
                {rupiah(transaction.totalAmount)}
              </span>
            </div>

            <div className="mt-4 text-right">
              <Link
                href={`/transaction-detail/${transaction.uuid}`}
                className="text-sm font-medium text-indigo-600 underline hover:text-indigo-800"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTicketPage;
