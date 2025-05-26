// import { Transaction } from "@/types/transaction";
// import { addHours, format } from "date-fns";
// import Link from "next/link";
// import { FC } from "react";
// import AddReview from "./AddReview";
// import UploadProofForm from "./UploadProofForm";

// interface TransactionDetailSectionProps {
//   transaction: Transaction;
// }

// const TransactionDetailSection: FC<TransactionDetailSectionProps> = ({
//   transaction,
// }) => {
//   const rupiah = (price: number) =>
//     new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//     }).format(price);

//   const expired = addHours(transaction.createdAt, 2);

//   return (
//     <section className="relative mx-4 my-10 overflow-hidden rounded-xl bg-white shadow-lg sm:mx-6 md:mx-12 lg:mx-24">
//       <div className="space-y-6 p-4 sm:p-6">
//         <h1 className="mb-2 text-xl font-bold text-indigo-700 sm:text-2xl">
//           Transaction ID: {transaction.uuid}
//         </h1>

//         {(transaction.status === "EXPIRED" ||
//           transaction.status === "CANCELED" ||
//           transaction.status === "REJECTED") && (
//           <p className="mb-2 font-bold text-red-500">
//             Status: {transaction.status}
//           </p>
//         )}

//         {transaction.status === "DONE" && (
//           <p className="mb-2 font-bold text-green-600">
//             Status: {transaction.status}
//           </p>
//         )}

//         {(transaction.status === "WAITING_FOR_PAYMENT" ||
//           transaction.status === "WAITING_CONFIRMATION") && (
//           <p className="mb-2 font-bold text-amber-500">
//             Status: {transaction.status}
//           </p>
//         )}

//         <p className="mb-4 text-base text-gray-600">
//           Your transaction details:
//         </p>

//         <ul className="space-y-4 divide-y divide-gray-100 rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200">
//           {transaction.transactionDetails.map((tx) => (
//             <li
//               key={tx.id}
//               className="flex flex-col items-start justify-between gap-2 pt-4 sm:flex-row sm:items-center"
//             >
//               <div>
//                 <p className="text-base font-semibold text-gray-900">
//                   {tx.ticket.event.name}
//                 </p>
//                 <p className="text-sm font-medium text-gray-700">
//                   {tx.ticket.ticketType}
//                 </p>
//                 <p className="text-sm text-gray-500">Quantity: {tx.qty}</p>
//               </div>
//               <div className="text-right text-base font-bold text-green-600">
//                 {rupiah(tx.ticket.price * tx.qty)}
//               </div>
//             </li>
//           ))}
//         </ul>

//         {transaction.usePoints && (
//           <p className="text-right text-sm font-semibold text-gray-700">
//             Points Used: {transaction.pointsUsed}
//           </p>
//         )}
//         {transaction.referralCouponUsed && (
//           <p className="text-right text-sm font-semibold text-gray-700">
//             Referral Coupon: {transaction.referralCoupon?.amount}
//           </p>
//         )}
//         {transaction.voucherUsed && (
//           <p className="text-right text-sm font-semibold text-gray-700">
//             Voucher Discount: {transaction.voucher?.discountAmount}
//           </p>
//         )}
//         <p className="mt-6 animate-pulse text-right text-lg font-bold text-green-600">
//           Total: {rupiah(transaction.totalAmount)}
//         </p>
//       </div>

//       {transaction.status === "WAITING_FOR_PAYMENT" && (
//         <div className="bg-green-50 p-4 text-center text-sm sm:text-base">
//           <p className="mb-2">
//             Upload your payment proof before{" "}
//             {format(expired, "dd MMM yyyy, HH:mm")} to avoid any system
//             cancelation.
//           </p>
//           <UploadProofForm uuid={transaction.uuid} />
//         </div>
//       )}

//       {transaction.status === "WAITING_CONFIRMATION" && (
//         <div className="mt-6 bg-amber-100 p-4 shadow-sm">
//           <p className="mb-3 text-sm text-gray-800">
//             ⏳ Your payment is being reviewed by the event organizer. Please be
//             patient while we confirm it. We will notify you by email once it is
//             done, stay tuned! ✨
//           </p>
//           <Link
//             href="/"
//             className="inline-block text-sm font-medium text-indigo-600 underline transition hover:text-indigo-800"
//           >
//             I wanna buy another event ticket
//           </Link>
//         </div>
//       )}

//       {transaction.status === "DONE" && (
//         <div className="my-12 flex w-full items-center justify-center">
//           <AddReview uuid={transaction.uuid} />
//         </div>
//       )}
//     </section>
//   );
// };

// export default TransactionDetailSection;

"use client";
import { Transaction } from "@/types/transaction";
import { addHours, format } from "date-fns";
import Link from "next/link";
import { FC } from "react";
import AddReview from "./AddReview";
import UploadProofForm from "./UploadProofForm";

interface TransactionDetailSectionProps {
  transaction: Transaction;
}

const TransactionDetailSection: FC<TransactionDetailSectionProps> = ({
  transaction,
}) => {
  const rupiah = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);

  const expired = addHours(transaction.createdAt, 2);

  // Status badge styles
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "EXPIRED":
      case "CANCELED":
      case "REJECTED":
        return "bg-red-100 text-red-600 border-red-200";
      case "DONE":
        return "bg-green-100 text-green-600 border-green-200";
      case "WAITING_FOR_PAYMENT":
      case "WAITING_CONFIRMATION":
        return "bg-amber-100 text-amber-600 border-amber-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <section className="relative mx-4 my-10 overflow-hidden rounded-xl bg-white shadow-lg sm:mx-6 md:mx-12 lg:mx-24">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-500 to-[#004DE8] p-4 sm:p-6">
        <h1 className="text-xl font-bold text-white sm:text-2xl">
          Transaction Details
        </h1>
        <p className="mt-1 text-sm font-medium text-indigo-100">
          ID: {transaction.uuid}
        </p>
      </div>

      <div className="space-y-6 p-6">
        {/* Status Badge */}
        <div className="flex items-center">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${getStatusBadge(transaction.status)}`}
          >
            {transaction.status}
          </span>

          {transaction.status === "WAITING_FOR_PAYMENT" && (
            <p className="ml-3 text-sm text-gray-500">
              Expires at {format(expired, "dd MMM yyyy, HH:mm")}
            </p>
          )}
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="mb-3 text-base font-medium text-gray-700">
            Transaction Summary
          </p>

          <ul className="divide-y divide-gray-200 rounded-lg bg-white p-4 shadow-sm">
            {transaction.transactionDetails.map((tx) => (
              <li
                key={tx.id}
                className="flex flex-col items-start justify-between gap-3 py-4 sm:flex-row sm:items-center"
              >
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900">
                    {tx.ticket.event.name}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      {tx.ticket.ticketType}
                    </span>
                    <span className="text-sm text-gray-500">
                      {rupiah(tx.ticket.price)} × {tx.qty}
                    </span>
                  </div>
                </div>
                <div className="text-right text-base font-bold text-green-600">
                  {rupiah(tx.ticket.price * tx.qty)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Summary Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <p className="mb-3 font-medium text-gray-700">Payment Summary</p>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">
                {rupiah(
                  transaction.transactionDetails.reduce(
                    (acc, tx) => acc + tx.ticket.price * tx.qty,
                    0,
                  ),
                )}
              </span>
            </div>

            {transaction.usePoints && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Points Used</span>
                <span className="font-medium text-orange-600">
                  -{transaction.pointsUsed} points
                </span>
              </div>
            )}

            {transaction.referralCouponUsed && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Referral Discount</span>
                <span className="font-medium text-orange-600">
                  -{rupiah(transaction.referralCoupon?.amount || 0)}
                </span>
              </div>
            )}

            {transaction.voucherUsed && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Voucher Discount</span>
                <span className="font-medium text-orange-600">
                  -{rupiah(transaction.voucher?.discountAmount || 0)}
                </span>
              </div>
            )}

            <div className="border-t border-dashed border-gray-200 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-gray-700">
                  Total
                </span>
                <span className="text-lg font-bold text-green-600">
                  {rupiah(transaction.totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Sections */}
      {transaction.status === "WAITING_FOR_PAYMENT" && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 text-center">
          <div className="mb-4">
            <div className="mb-3 inline-flex rounded-full bg-amber-100 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700">
              Please upload your payment proof before{" "}
              <span className="font-semibold text-[#004DE8]">
                {format(expired, "dd MMM yyyy, HH:mm")}
              </span>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Your booking will be automatically canceled after this time
            </p>
          </div>
          <UploadProofForm uuid={transaction.uuid} />
        </div>
      )}

      {transaction.status === "WAITING_CONFIRMATION" && (
        <div className="border-t border-gray-100 bg-amber-50 p-6">
          <div className="flex items-start">
            <div className="mr-4 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                Your payment is being reviewed by the event organizer
              </p>
              <p className="mt-1 text-xs text-gray-600">
                We will notify you by email once it is confirmed. Thank you for
                your patience!
              </p>
              <Link
                href="/"
                className="mt-3 inline-block text-sm font-medium text-[#004DE8] transition hover:text-[#004DE8]/80"
              >
                Browse more events
              </Link>
            </div>
          </div>
        </div>
      )}

      {transaction.status === "DONE" && (
        <div className="border-t border-gray-100 bg-green-50 p-6">
          <div className="mb-4 flex items-center justify-center">
            <div className="mr-3 rounded-full bg-green-100 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-base font-medium text-green-700">
              Payment completed successfully
            </p>
          </div>
          <div className="flex justify-center">
            <AddReview uuid={transaction.uuid} />
          </div>
        </div>
      )}
    </section>
  );
};

export default TransactionDetailSection;
