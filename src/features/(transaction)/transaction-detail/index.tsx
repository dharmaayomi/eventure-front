"use client";

import useGetTransaction from "@/hooks/api/transaction/useGetTransaction";
import { FC } from "react";
import TransactionDetailSection from "./_components/TransactionDetailSection";

interface TransactonDetailPageProps {
  uuid: string;
}

const TransactionDetailPage: FC<TransactonDetailPageProps> = async ({
  uuid,
}) => {
  const { data: transaction, isPending, error } = useGetTransaction(uuid);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;

  return (
    <>
      <TransactionDetailSection transaction={transaction} />
    </>
  );
};
export default TransactionDetailPage;
