import TransactionDetailPage from "@/features/(transaction)/transaction-detail";
import { Suspense } from "react";

const TransactionDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const uuid = (await params).id;
  return (
    <main className="container mx-auto">
      <div className="mt-30 p-8">
        <Suspense>
          <TransactionDetailPage uuid={uuid} />
        </Suspense>
      </div>
    </main>
  );
};

export default TransactionDetail;
