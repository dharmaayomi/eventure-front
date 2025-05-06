"use client";
import { useEffect, useState } from "react";
import useGetTransactionByOrganizer from "@/hooks/api/organizer/useGetTransactionByOrganizer";
import { formatRupiah } from "@/utils/FormatRupiah";
import {
  BadgeDollarSign,
  CircleDollarSign,
  DollarSignIcon,
} from "lucide-react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const RevenueCard = () => {
  const { data, isLoading } = useGetTransactionByOrganizer();
  const totalRevenue = data?.data.totalRevenue || 0;
  const [isVisible, setIsVisible] = useState(false);

  const [animatedRevenue, setAnimatedRevenue] = useState(0);
  //   console.log("ini total revenue", totalRevenue);

  useEffect(() => {
    if (!isLoading) {
      const increment = totalRevenue / 50;
      const animate = () => {
        setAnimatedRevenue((prev) => {
          if (prev + increment >= totalRevenue) return totalRevenue;
          return prev + increment;
        });
      };
      const intervalId = setInterval(animate, 30);
      return () => clearInterval(intervalId);
    }
  }, [totalRevenue, isLoading]);

  if (isLoading || !data) {
    return (
      <div className="animate-pulse rounded-xl border bg-white p-6">
        <div className="space-y-5">
          <div className="h-12 w-12 rounded-xl bg-gray-200"></div>
          <div className="mt-4 h-6 w-1/3 rounded bg-gray-200"></div>
          <div className="mt-2 h-8 w-1/2 rounded bg-gray-200"></div>
          <div className="mt-2 h-4 w-3/4 rounded bg-gray-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="transform rounded-xl border bg-white from-white to-gray-50 p-6 transition-all duration-300 hover:scale-103 hover:bg-gradient-to-br hover:shadow-xl"
      style={{ animationDelay: `10ms` }}
      role="article"
      aria-label={`Revenue metrics card`}
    >
      <div className="flex justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
          <CircleDollarSign className="text-2xl text-black" />
        </div>
        <button
          onClick={() => setIsVisible((prev) => !prev)}
          aria-label="Toggle revenue visibility"
          className="text-gray-400 transition hover:text-blue-600"
        >
          {isVisible ? (
            <EyeIcon className="h-5 w-5" />
          ) : (
            <EyeOffIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      <div className="mt-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Total Revenue
        </span>
        <div className="mt-2 text-3xl font-bold text-gray-800 dark:text-white/90">
          {isVisible ? formatRupiah(Math.round(animatedRevenue)) : "•••••••"}
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Total revenue from all transactions.
        </p>
      </div>
    </div>
  );
};

export default RevenueCard;
