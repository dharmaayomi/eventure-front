import TransactionDetailPage from "@/features/(transaction)/transaction-detail";
import React from "react";

const TransactionDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const uuid = (await params).id;
  return (
    <main className="container mx-auto">
      <div className="mt-30">
        {" "}
        <TransactionDetailPage uuid={uuid} />
      </div>
    </main>
  );
};

export default TransactionDetail;
