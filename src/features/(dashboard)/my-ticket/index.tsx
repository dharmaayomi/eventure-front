// "use client";

// import useGetTransactionsByUserId from "@/hooks/api/transaction/useGetTransactionsByUserId";
// import Link from "next/link";
// import { format } from "date-fns";

// const MyTicketPage = () => {
//   const { data: transactions, isPending, error } = useGetTransactionsByUserId();

//   if (isPending) return <div className="p-6 text-center">Loading...</div>;
//   if (error)
//     return (
//       <div className="p-6 text-center text-red-500">Something went wrong!</div>
//     );
//   if (!transactions || transactions.length === 0) {
//     return (
//       <div className="p-6 text-center text-gray-500">
//         You don’t have any tickets yet.
//       </div>
//     );
//   }

//   const rupiah = (price: number) =>
//     new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//     }).format(price);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="mb-6 text-2xl font-bold text-indigo-700">My Tickets</h1>

//       <div className="space-y-6">
//         {transactions.map((transaction) => (
//           <div
//             key={transaction.uuid}
//             className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
//           >
//             <div className="mb-2 flex flex-col justify-between sm:flex-row sm:items-center">
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-800">
//                   Transaction: {transaction.uuid}
//                 </h2>
//                 <p className="text-sm text-gray-600">
//                   Date:{" "}
//                   {format(
//                     new Date(transaction.createdAt),
//                     "dd MMM yyyy, HH:mm",
//                   )}
//                 </p>
//               </div>
//               <span
//                 className={`mt-2 inline-block rounded-md px-3 py-1 text-sm font-medium sm:mt-0 ${
//                   transaction.status === "DONE"
//                     ? "bg-green-100 text-green-700"
//                     : transaction.status === "WAITING_FOR_PAYMENT"
//                       ? "bg-amber-100 text-amber-700"
//                       : transaction.status === "WAITING_CONFIRMATION"
//                         ? "bg-blue-100 text-blue-700"
//                         : "bg-red-100 text-red-700"
//                 }`}
//               >
//                 {transaction.status.replaceAll("_", " ")}
//               </span>
//             </div>

//             <ul className="mt-4 divide-y divide-gray-100">
//               {transaction.transactionDetails.map((tx) => (
//                 <li
//                   key={tx.id}
//                   className="flex items-start justify-between py-3"
//                 >
//                   <div>
//                     <p className="text-sm font-semibold text-gray-800">
//                       {tx.ticket.event.name}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {tx.ticket.ticketType}
//                     </p>
//                     <p className="text-sm text-gray-400">Qty: {tx.qty}</p>
//                   </div>
//                   <p className="text-sm font-bold text-green-600">
//                     {rupiah(tx.ticket.price * tx.qty)}
//                   </p>
//                 </li>
//               ))}
//             </ul>

//             <div className="mt-4 text-right text-sm text-gray-700">
//               Total:{" "}
//               <span className="font-bold text-green-700">
//                 {rupiah(transaction.totalAmount)}
//               </span>
//             </div>

//             <div className="mt-4 text-right">
//               <Link
//                 href={`/transaction-detail/${transaction.uuid}`}
//                 className="text-sm font-medium text-indigo-600 underline hover:text-indigo-800"
//               >
//                 View Details
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyTicketPage;
"use client";

import useGetTransactionsByUserId from "@/hooks/api/transaction/useGetTransactionsByUserId";
import Link from "next/link";
import { format } from "date-fns";
import {
  Ticket,
  CalendarCheck,
  Clock,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";

const MyTicketPage = () => {
  const { data: transactions, isPending, error } = useGetTransactionsByUserId();

  if (isPending) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#004DE8] border-t-transparent"></div>
          <p className="mt-4 text-[#004DE8]">Loading your tickets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto my-16 max-w-md rounded-lg bg-red-50 p-6 text-center">
        <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
        <h3 className="mb-2 text-lg font-semibold text-red-700">
          Error Loading Tickets
        </h3>
        <p className="text-red-600">
          We couldn't load your tickets. Please try again later.
        </p>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="mx-auto my-16 max-w-md rounded-lg bg-gray-50 p-8 text-center shadow-sm">
        <Ticket className="mx-auto mb-4 h-16 w-16 text-gray-300" />
        <h3 className="mb-2 text-xl font-semibold text-gray-700">
          No Tickets Found
        </h3>
        <p className="mb-6 text-gray-500">
          You haven't purchased any tickets yet.
        </p>
        <Link
          href="/events"
          className="inline-flex items-center rounded-lg bg-[#004DE8] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#003bb0]"
        >
          Explore Events
        </Link>
      </div>
    );
  }

  const rupiah = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DONE":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "WAITING_FOR_PAYMENT":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "WAITING_CONFIRMATION":
        return <HelpCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold tracking-tight text-[#004DE8]">
            My Tickets
          </h1>
          <p className="text-sm text-gray-600">
            View and manage your purchased tickets
          </p>
        </div>
        <Link
          href="/events"
          className="rounded-lg bg-[#004DE8]/10 px-4 py-2 text-sm font-medium text-[#004DE8] transition hover:bg-[#004DE8]/20"
        >
          Browse Events
        </Link>
      </div>

      <div className="space-y-6">
        {transactions.map((transaction) => (
          <div
            key={transaction.uuid}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
          >
            {/* Header */}
            <div className="border-b border-gray-100 bg-gradient-to-r from-[#004DE8]/5 to-white p-4">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div className="flex items-start gap-3">
                  <div className="hidden rounded-lg bg-[#004DE8]/10 p-2 sm:block">
                    <CalendarCheck className="h-6 w-6 text-[#004DE8]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">
                      TRANSACTION ID
                    </p>
                    <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
                      {transaction.uuid}
                    </h2>
                    <p className="mt-1 flex items-center text-xs text-gray-500">
                      <Clock className="mr-1 h-3 w-3" />
                      {format(
                        new Date(transaction.createdAt),
                        "dd MMM yyyy, HH:mm",
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                      transaction.status === "DONE"
                        ? "bg-green-100 text-green-700"
                        : transaction.status === "WAITING_FOR_PAYMENT"
                          ? "bg-amber-100 text-amber-700"
                          : transaction.status === "WAITING_CONFIRMATION"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                    }`}
                  >
                    {getStatusIcon(transaction.status)}
                    {transaction.status.replaceAll("_", " ")}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <ul className="divide-y divide-gray-100">
                {transaction.transactionDetails.map((tx) => (
                  <li
                    key={tx.id}
                    className="flex items-start justify-between gap-4 py-3"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {tx.ticket.event.name}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-md bg-[#004DE8]/10 px-2 py-1 text-xs font-medium text-[#004DE8]">
                          {tx.ticket.ticketType}
                        </span>
                        <span className="text-xs text-gray-500">
                          {rupiah(tx.ticket.price)} × {tx.qty}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-bold whitespace-nowrap text-[#004DE8]">
                      {rupiah(tx.ticket.price * tx.qty)}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="text-sm font-medium text-gray-700">
                  Total Amount:
                  <span className="ml-2 font-bold text-[#004DE8]">
                    {rupiah(transaction.totalAmount)}
                  </span>
                </div>
                <Link
                  href={`/transaction-detail/${transaction.uuid}`}
                  className="inline-flex items-center rounded-lg bg-[#004DE8] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#003bb0]"
                >
                  View Details
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTicketPage;
