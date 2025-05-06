"use client";

import { Button } from "@/components/ui/button";
import useGetTransactionByOrganizer from "@/hooks/api/organizer/useGetTransactionByOrganizer";
import Link from "next/link";

const CardTotalEvent = () => {
  const {
    data: transaction,
    isLoading,
    isError,
  } = useGetTransactionByOrganizer();
  return (
    <div className="bg-muted rounded-2xl border">
      <div className="space-y-6 rounded-2xl border bg-white p-6">
        <div className="space-y-3">
          <h3 className="text-primary text-center text-3xl font-semibold">
            🎉 Congratulations!
          </h3>
          <p className="text-muted-foreground text-center">
            You’ve successfully created{" "}
            <span className="text-primary font-bold">
              {transaction?.data.totalTransactions || 0}
            </span>{" "}
            events!
          </p>
        </div>
        <div className="bg-muted/40 flex h-40 items-center justify-center rounded-xl shadow-inner">
          <p className="text-primary text-7xl font-extrabold">
            {" "}
            {transaction?.data.totalTransactions || 0}
          </p>
        </div>
      </div>
      <div className="p-6 text-center text-sm">
        Keep creating awesome events and earn more 🚀
        <Link href="/dashboard/my-event">
          <Button className="hover: mt-4">Create Event</Button>
        </Link>
      </div>
    </div>
  );
};

export default CardTotalEvent;
