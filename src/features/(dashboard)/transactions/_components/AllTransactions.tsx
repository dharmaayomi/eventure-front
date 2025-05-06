"use client";

import { FC, useState } from "react";
import useGetTransactionByOrganizer from "@/hooks/api/organizer/useGetTransactionByOrganizer";
import PaginationSection from "@/components/PaginationSection";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import Image from "next/image";

const AllTransactions: FC = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debouncedSearch] = useDebounceValue(search, 500);

  // State to handle transaction modal
  const [showModal, setShowModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<any>(null);

  // Gunakan hook dengan parameter search
  const { data, isLoading, isError } = useGetTransactionByOrganizer({
    take: 6,
    page,
    sortBy: "createdAt",
    sortOrder: "desc",
    search: debouncedSearch,
  });

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  // Ekstrak data dengan benar berdasarkan struktur dari API
  const transactions = data?.data?.transactions || [];
  const meta = data?.meta || { page: 1, take: 6, total: 0 };
  const totalTransactions = data?.data?.totalTransactions || 0;

  const handleViewTransaction = (transaction: any) => {
    setCurrentTransaction(transaction);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentTransaction(null);
  };

  return (
    <div className="space-y-4">
      <Input
        className="mx-auto mt-4 w-full"
        placeholder="Search by event name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        {isLoading && (
          <div className="flex h-48 items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        )}

        {isError && (
          <div className="flex h-48 items-center justify-center">
            <p className="text-red-500">Error loading transactions</p>
          </div>
        )}

        {!isLoading && !isError && (
          <>
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
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions && transactions.length > 0 ? (
                    transactions.map((transaction) => (
                      <tr key={transaction.uuid}>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {(transaction.transactionDetails &&
                            transaction.transactionDetails[0]?.ticket?.event
                              ?.name) ||
                            "Unknown Event"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {transaction.user?.email || "-"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {(transaction.transactionDetails &&
                            transaction.transactionDetails.reduce(
                              (acc, td) => acc + (td.qty || 0),
                              0,
                            )) ||
                            1}
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
                            {transaction.status || "UNKNOWN"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          ${transaction.totalAmount?.toLocaleString() || "0"}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => handleViewTransaction(transaction)}
                            className="rounded-md bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600"
                          >
                            See Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        <div className="flex flex-col items-center justify-center py-6 text-gray-500">
                          <Image
                            src="/pending.webp"
                            alt="empty"
                            width={120}
                            height={180}
                            className="mb-3"
                          />
                          <p className="mt-10 text-sm">No transactions found</p>
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
          </>
        )}
      </div>

      {/* Transaction Detail Modal */}
      {showModal && currentTransaction && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/70 p-4">
          <div className="scrollbar-hide relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 text-sm text-gray-600 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 transition hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            <h3 className="mb-6 text-xl font-semibold text-gray-800">
              Transaction Details
            </h3>

            <div className="flex flex-col md:flex-row md:space-x-6">
              {/* Left Side - Information */}
              <div className="flex-1 space-y-6">
                {/* User & Transaction Info */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* User Info */}
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="mb-2 font-semibold text-gray-700">
                      User Info
                    </p>
                    <div className="space-y-1">
                      <p>Name: {currentTransaction.user?.fullName || "-"}</p>
                      <p>Email: {currentTransaction.user?.email || "-"}</p>
                    </div>
                  </div>

                  {/* Transaction Info */}
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="mb-2 font-semibold text-gray-700">
                      Transaction
                    </p>
                    <div className="space-y-1">
                      <p className="text-xs">
                        UUID: {currentTransaction.uuid || "-"}
                      </p>
                      <p>
                        Date:{" "}
                        {new Date(
                          currentTransaction.createdAt,
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p>
                        Status:{" "}
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            currentTransaction.status === "DONE"
                              ? "bg-green-100 text-green-800"
                              : currentTransaction.status ===
                                  "WAITING_CONFIRMATION"
                                ? "bg-yellow-100 text-yellow-800"
                                : currentTransaction.status ===
                                    "WAITING_FOR_PAYMENT"
                                  ? "bg-blue-100 text-blue-800"
                                  : currentTransaction.status === "REJECTED"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {currentTransaction.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="mb-2 font-semibold text-gray-700">Payment</p>
                    <div className="space-y-1">
                      <p>
                        Total Price: $
                        {currentTransaction.totalAmount?.toLocaleString() ||
                          "0"}
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
                        {currentTransaction.totalAmount?.toLocaleString() ||
                          "0"}
                      </p>
                    </div>
                  </div>

                  {/* Ticket */}
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="mb-2 font-semibold text-gray-700">Ticket</p>
                    <div className="space-y-1">
                      <p>
                        Event:{" "}
                        {(currentTransaction.transactionDetails &&
                          currentTransaction.transactionDetails[0]?.ticket
                            ?.event?.name) ||
                          "Unknown Event"}
                      </p>
                      <p>
                        Quantity:{" "}
                        {(currentTransaction.transactionDetails &&
                          currentTransaction.transactionDetails[0]?.qty) ||
                          1}
                      </p>
                      <p>
                        Type:{" "}
                        {(currentTransaction.transactionDetails &&
                          currentTransaction.transactionDetails[0]?.ticket
                            ?.ticketType) ||
                          "-"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ticket Types Table */}
                {currentTransaction.tickets?.length > 0 && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="mb-2 font-semibold text-gray-700">
                      Ticket Types
                    </p>
                    <div className="scrollbar-hide max-h-40 overflow-y-auto rounded-md border border-gray-200">
                      <table className="w-full text-xs">
                        <thead className="bg-gray-100 text-left font-medium text-gray-500">
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
              </div>

              {/* Right Side - Payment Proof */}
              {currentTransaction.paymentProof && (
                <div className="mt-6 md:mt-0 md:w-2/5">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="mb-2 font-semibold text-gray-700">
                      Payment Proof
                    </p>
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                      <img
                        src={currentTransaction.paymentProof}
                        alt="Payment Proof"
                        className="h-67 w-full rounded-lg object-contain"
                        style={{ maxHeight: "400px" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTransactions;
