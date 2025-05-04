import { Transaction } from "@/types/transaction";
import { FC } from "react";

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

  return (
    <section className="relative overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-200">
      <div className="space-y-6 p-6">
        <h1 className="mb-2 text-2xl font-bold text-indigo-700">
          Transaction ID: {transaction.uuid}
        </h1>

        <p className="mb-2 font-bold text-amber-500">
          Status: {transaction.status}
        </p>

        <p className="mb-4 text-base text-gray-600">
          Your transaction details:
        </p>

        <ul className="space-y-4 divide-y divide-gray-100 rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200">
          {transaction.transactionDetails.map((tx) => (
            <li key={tx.id} className="flex items-center justify-between pt-4">
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

        <p className="mt-6 text-right text-lg font-bold text-gray-800">
          Total: {rupiah(transaction.totalAmount)}
        </p>
      </div>
    </section>
  );
};

export default TransactionDetailSection;
