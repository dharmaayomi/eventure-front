import { useState } from "react";

import Image from "next/image";
import { DollarSign, Download, Search, User, X } from "lucide-react";
import { IconPigMoney } from "@tabler/icons-react";

interface Transaction {
  id: string;
  attendeeName: string;
  amount: number;
  date: string;
  status: "Pending" | "Approved";
  proofImage: string;
}

interface Stats {
  totalRevenue: number;
  ticketsSold: number;
  regularTickets: number;
  vipTickets: number;
}

const DetailEvent: React.FC = () => {
  const [activeView, setActiveView] = useState<"transactions" | "attendees">(
    "transactions",
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedProof, setSelectedProof] = useState<string | null>(null);

  const mockTransactions: Transaction[] = [
    {
      id: "TRX001",
      attendeeName: "John Smith",
      amount: 299.99,
      date: "2024-01-15",
      status: "Pending",
      proofImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
    },
    {
      id: "TRX002",
      attendeeName: "Emma Wilson",
      amount: 199.99,
      date: "2024-01-14",
      status: "Approved",
      proofImage: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
    },
    {
      id: "TRX003",
      attendeeName: "Michael Brown",
      amount: 499.99,
      date: "2024-01-13",
      status: "Pending",
      proofImage: "https://images.unsplash.com/photo-1554224155-1696413565d3",
    },
  ];

  const stats: Stats = {
    totalRevenue: 999.97,
    ticketsSold: 3,
    regularTickets: 2,
    vipTickets: 1,
  };

  const handleProofView = (proof: string) => {
    setSelectedProof(proof);
    setShowModal(true);
  };

  const PaymentProofModal: React.FC = () => {
    if (!showModal || !selectedProof) return null;

    return (
      <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="mx-4 w-full max-w-2xl rounded-lg bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold">Payment Proof</h3>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <img
            src={selectedProof}
            alt="Payment Proof"
            className="mb-4 h-auto w-full rounded-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa";
            }}
          />
          <div className="flex justify-end gap-4">
            <button className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600">
              Reject Payment
            </button>
            <button className="rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600">
              Accept Payment
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 rounded-lg bg-white shadow-sm">
          <div className="flex border-b">
            <button
              onClick={() => setActiveView("transactions")}
              className={`flex-1 py-4 text-center font-medium transition ${
                activeView === "transactions"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Transactions List
            </button>
            <button
              onClick={() => setActiveView("attendees")}
              className={`flex-1 py-4 text-center font-medium transition ${
                activeView === "attendees"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Attendees View
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="relative max-w-md flex-1">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-lg border py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
            <Download />
            Export Data
          </button>
        </div>

        {activeView === "transactions" ? (
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                      Attendee
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
                  {mockTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {transaction.attendeeName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        ${transaction.amount}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            transaction.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() =>
                            handleProofView(transaction.proofImage)
                          }
                          className="text-blue-500 transition hover:text-blue-700"
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
        ) : (
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                      Attendee
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
                  {mockTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {transaction.attendeeName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        ${transaction.amount}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            transaction.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() =>
                            handleProofView(transaction.proofImage)
                          }
                          className="text-blue-500 transition hover:text-blue-700"
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
        )}
      </div>

      <PaymentProofModal />
    </div>
  );
};

export default DetailEvent;
