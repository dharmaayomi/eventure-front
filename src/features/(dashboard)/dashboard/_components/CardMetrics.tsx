// import {
//   ArrowDown,
//   ArrowUpIcon,
//   Badge,
//   BoxIcon,
//   GroupIcon,
// } from "lucide-react";
// import React from "react";

// const CardMetrics = () => {
//   return (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
//       {/* <!-- Metric Item Start --> */}
//       <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
//         <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
//           <GroupIcon className="size-6 text-gray-800 dark:text-white/90" />
//         </div>

//         <div className="mt-4 flex items-end justify-between">
//           <div>
//             <span className="text-sm text-gray-500 dark:text-gray-400">
//               Customers
//             </span>
//             <h4 className="text-title-sm mt-2 font-bold text-gray-800 dark:text-white/90">
//               3,782
//             </h4>
//           </div>
//           <Badge color="success">
//             <ArrowUpIcon />
//             11.01%
//           </Badge>
//         </div>
//       </div>
//       {/* <!-- Metric Item End --> */}

//       {/* <!-- Metric Item Start --> */}
//       <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
//         <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
//           <BoxIcon className="text-gray-800 dark:text-white/90" />
//         </div>
//         <div className="mt-4 flex items-end justify-between">
//           <div>
//             <span className="text-sm text-gray-500 dark:text-gray-400">
//               Orders
//             </span>
//             <h4 className="text-title-sm mt-2 font-bold text-gray-800 dark:text-white/90">
//               5,359
//             </h4>
//           </div>

//           <Badge color="error">
//             <ArrowDown className="text-error-500" />
//             9.05%
//           </Badge>
//         </div>
//       </div>
//       {/* <!-- Metric Item End --> */}
//     </div>
//   );
// };

// export default CardMetrics;

"use client";

import { useEffect, useState } from "react";
import { Ticket, FileText } from "lucide-react";
import useGetTransactionByOrganizer from "@/hooks/api/organizer/useGetTransactionByOrganizer";
import { useQueryState, parseAsInteger } from "nuqs";
import { useDebounceValue } from "usehooks-ts";

type MetricCardProps = {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  delay: number;
  description?: string;
};

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  delay,
  description,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = value / 50;
      const animate = () => {
        setCount((prev) => {
          if (prev + increment >= value) return value;
          return prev + increment;
        });
      };
      const intervalId = setInterval(animate, 30);
      return () => clearInterval(intervalId);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div
      className="transform rounded-xl border bg-white from-white to-gray-50 p-6 transition-all duration-300 hover:scale-103 hover:bg-gradient-to-br hover:shadow-xl"
      style={{ animationDelay: `${delay}ms` }}
      role="article"
      aria-label={`${title} metrics card`}
    >
      <div className="flex justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
          <Icon className={`text-${color}-600 text-2xl`} />
        </div>
      </div>
      <div className="mt-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {title}
        </span>
        <div className="mt-2 flex items-center gap-1 text-3xl font-bold text-gray-800 dark:text-white/90">
          {Math.round(count).toLocaleString()}
        </div>
        {description && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

const CardMetrics = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debouncedSearch] = useDebounceValue(search, 500);
  const {
    data: transaction,
    isLoading,
    error,
  } = useGetTransactionByOrganizer({
    take: 6,
    page: page,
    sortBy: "createdAt",
    sortOrder: "desc",
    search: debouncedSearch,
  });

  if (isLoading || !transaction) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {[1, 2].map((index) => (
          <div
            key={index}
            className="animate-pulse rounded-xl border bg-white p-6"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-gray-200"></div>
              <div className="mt-4 h-6 w-1/3 rounded bg-gray-200"></div>
              <div className="mt-2 h-8 w-1/2 rounded bg-gray-200"></div>
              <div className="mt-2 h-4 w-3/4 rounded bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const totalTickets = transaction.data?.totalTicket;
  const totalTransactions = transaction.data.totalTransactions;

  console.log("ini total tikets", transaction);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      <MetricCard
        title="Total Tickets"
        value={totalTickets}
        icon={Ticket}
        color="black"
        delay={200}
        description="Total number of tickets successfully purchased."
      />
      <MetricCard
        title="Total Transactions"
        value={totalTransactions}
        icon={FileText}
        color="black"
        delay={200}
        description="Total number of transactions made in the system"
      />
    </div>
  );
};

export default CardMetrics;
