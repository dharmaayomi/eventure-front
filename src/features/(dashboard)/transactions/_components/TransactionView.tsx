"use client";

import { useState } from "react";
import PendingTransactionList from "./PendingAction";
import AllTransactions from "./AllTransactions";

const TransactionView = () => {
  const [activeView, setActiveView] = useState<"transactions" | "attendees">(
    "transactions",
  );
  return (
    <div>
      <div className="mb-8 w-full rounded-lg bg-white shadow-sm">
        <div
          className="relative flex w-full items-center justify-between rounded-lg bg-gray-100 p-1"
          role="tablist"
        >
          {/* Slider background */}
          <div
            className={`absolute top-1 ${
              activeView === "attendees" ? "left-1/2" : "left-1"
            } h-[calc(100%-0.5rem)] w-[calc(50%-0.25rem)] rounded-md bg-[#004DE8] transition-all duration-300 ease-in-out`}
          />

          {/* Waiting Confirmation */}
          <button
            onClick={() => setActiveView("transactions")}
            role="tab"
            className={`z-10 w-1/2 py-3 text-center text-sm font-semibold transition-colors duration-300 ${
              activeView === "transactions"
                ? "text-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Waiting Confirmation
          </button>

          {/*  all transactions */}
          <button
            onClick={() => setActiveView("attendees")}
            role="tab"
            className={`z-10 w-1/2 py-3 text-center text-sm font-semibold transition-colors duration-300 ${
              activeView === "attendees"
                ? "text-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            All Transactions
          </button>
        </div>
      </div>

      {activeView === "transactions" && <PendingTransactionList />}
      {activeView === "attendees" && <AllTransactions />}
    </div>
  );
};

export default TransactionView;
