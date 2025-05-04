"use client";

import useGetTransaction from "@/hooks/api/transaction/useGetTransaction";
import TransactionDetailSection from "./_components/TransactionDetailSection";
import { FC } from "react";

interface TransactonDetailPageProps {
  uuid: string;
}

const TransactionDetailPage: FC<TransactonDetailPageProps> = ({ uuid }) => {
  const { data: transaction, isPending, error } = useGetTransaction(uuid);
  console.log("data tx detail:", transaction);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;

  return (
    <>
      <TransactionDetailSection transaction={transaction} />
    </>
  );
};
export default TransactionDetailPage;
