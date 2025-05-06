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

  return (
    <section className="relative mx-4 my-10 overflow-hidden rounded-xl bg-white shadow-lg sm:mx-6 md:mx-12 lg:mx-24">
      <div className="space-y-6 p-4 sm:p-6">
        <h1 className="mb-2 text-xl font-bold text-indigo-700 sm:text-2xl">
          Transaction ID: {transaction.uuid}
        </h1>

        {(transaction.status === "EXPIRED" ||
          transaction.status === "CANCELED" ||
          transaction.status === "REJECTED") && (
          <p className="mb-2 font-bold text-red-500">
            Status: {transaction.status}
          </p>
        )}

        {transaction.status === "DONE" && (
          <p className="mb-2 font-bold text-green-600">
            Status: {transaction.status}
          </p>
        )}

        {(transaction.status === "WAITING_FOR_PAYMENT" ||
          transaction.status === "WAITING_CONFIRMATION") && (
          <p className="mb-2 font-bold text-amber-500">
            Status: {transaction.status}
          </p>
        )}

        <p className="mb-4 text-base text-gray-600">
          Your transaction details:
        </p>

        <ul className="space-y-4 divide-y divide-gray-100 rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200">
          {transaction.transactionDetails.map((tx) => (
            <li
              key={tx.id}
              className="flex flex-col items-start justify-between gap-2 pt-4 sm:flex-row sm:items-center"
            >
              <div>
                <p className="text-base font-semibold text-gray-900">
                  {tx.ticket.event.name}
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {tx.ticket.ticketType}
                </p>
                <p className="text-sm text-gray-500">Quantity: {tx.qty}</p>
              </div>
              <div className="text-right text-base font-bold text-green-600">
                {rupiah(tx.ticket.price * tx.qty)}
              </div>
            </li>
          ))}
        </ul>

        {transaction.usePoints && (
          <p className="text-right text-sm font-semibold text-gray-700">
            Points Used: {transaction.pointsUsed}
          </p>
        )}
        {transaction.referralCouponUsed && (
          <p className="text-right text-sm font-semibold text-gray-700">
            Referral Coupon: {transaction.referralCoupon?.amount}
          </p>
        )}
        {transaction.voucherUsed && (
          <p className="text-right text-sm font-semibold text-gray-700">
            Voucher Discount: {transaction.voucher?.discountAmount}
          </p>
        )}
        <p className="mt-6 animate-pulse text-right text-lg font-bold text-green-600">
          Total: {rupiah(transaction.totalAmount)}
        </p>
      </div>

      {transaction.status === "WAITING_FOR_PAYMENT" && (
        <div className="bg-green-50 p-4 text-center text-sm sm:text-base">
          <p className="mb-2">
            Upload your payment proof before{" "}
            {format(expired, "dd MMM yyyy, HH:mm")} to avoid any system
            cancelation.
          </p>
          <UploadProofForm uuid={transaction.uuid} />
        </div>
      )}

      {transaction.status === "WAITING_CONFIRMATION" && (
        <div className="mt-6 bg-amber-100 p-4 shadow-sm">
          <p className="mb-3 text-sm text-gray-800">
            ⏳ Your payment is being reviewed by the event organizer. Please be
            patient while we confirm it. We will notify you by email once it is
            done, stay tuned! ✨
          </p>
          <Link
            href="/"
            className="inline-block text-sm font-medium text-indigo-600 underline transition hover:text-indigo-800"
          >
            I wanna buy another event ticket
          </Link>
        </div>
      )}

      {transaction.status === "DONE" && (
        <div className="my-12 flex w-full items-center justify-center">
          <AddReview uuid={transaction.uuid} />
        </div>
      )}
    </section>
  );
};

export default TransactionDetailSection;
