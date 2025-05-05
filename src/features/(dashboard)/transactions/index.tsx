import React from "react";
import TransactionView from "./_components/TransactionView";

const TransactionsPage = () => {
  return (
    <div>
      <div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <TransactionView />
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
