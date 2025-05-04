"use client";

import { Button } from "@/components/ui/button";
import useCreateTransaction from "@/hooks/api/transaction/useCreateTransaction";
import { Event } from "@/types/event";
import { FC, useState } from "react";

interface FormTransactionProps {
  event: Event;
}

const FormTransaction: FC<FormTransactionProps> = ({ event }) => {
  const { mutateAsync: createTransaction, isPending } = useCreateTransaction();
  const [selectedTickets, setSelectedTickets] = useState<{
    [ticketId: number]: number;
  }>({});
  const [usePoints, setUsePoints] = useState<boolean>(false);
  const [referralCouponCode, setReferralCouponCode] = useState<string>("");
  const [voucherCode, setVoucherCode] = useState<string>("");

  const rupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const handleSelectTix = (ticketId: number) => {
    setSelectedTickets((currentSelection) => {
      if (currentSelection[ticketId]) {
        const update = { ...currentSelection };
        delete update[ticketId];
        return update;
      } else {
        return { ...currentSelection, [ticketId]: 1 };
      }
    });
  };

  const handleQtyTix = (ticketId: number, qty: number) => {
    setSelectedTickets((currentSelection) => {
      if (currentSelection[ticketId]) {
        return { ...currentSelection, [ticketId]: qty };
      }
      return currentSelection;
    });
  };

  const handleCheckout = async () => {
    const details = Object.keys(selectedTickets).map((ticketId) => ({
      ticketId: Number(ticketId),
      qty: selectedTickets[Number(ticketId)],
    }));

    const payload = {
      details,
      referralCouponCode,
      voucherCode,
      usePoints,
    };
    console.log("sending to backend", payload);
    await createTransaction(payload);
  };

  return (
    <section className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <p className="text-lg font-semibold text-indigo-700">
        🎟️ Available Tickets
      </p>

      {event.tickets.length > 0 ? (
        <>
          <ul className="list-none divide-y divide-gray-200 rounded-md">
            {event.tickets?.map((ticket) => (
              <li
                key={ticket.id}
                className="flex flex-col items-start justify-between gap-3 py-4 sm:flex-row sm:items-center"
              >
                <div className="flex items-center">
                  <input
                    id="ticketId"
                    name="ticketId"
                    type="checkbox"
                    className="form-checkbox mr-3 h-5 w-5 text-indigo-600"
                    checked={!!selectedTickets[ticket.id]}
                    onChange={() => {
                      handleSelectTix(ticket.id);
                    }}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {ticket.ticketType.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">Click to select</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-sm font-bold text-green-600 sm:text-base">
                    {rupiah(ticket.price)}
                  </p>

                  {selectedTickets[ticket.id] && (
                    <div className="flex items-center gap-2">
                      <input
                        id="qty"
                        name="qty"
                        type="number"
                        min="1"
                        className="focus:ring-opacity-50 w-20 rounded-md border border-gray-300 text-center shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                        value={selectedTickets[ticket.id] || 0}
                        onChange={(e) => {
                          handleQtyTix(ticket.id, e.target.valueAsNumber);
                        }}
                      />
                      <span className="text-xs text-gray-500">Qty</span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                id="usePoints"
                name="usePoints"
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
                checked={usePoints}
                onChange={(e) => {
                  setUsePoints(e.target.checked);
                }}
              />
              <label htmlFor="usePoints" className="text-sm text-gray-800">
                Use my reward points ✨
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label
                  htmlFor="referralCouponCode"
                  className="text-sm font-medium text-gray-700"
                >
                  Coupon Code
                </label>
                <input
                  id="referralCouponCode"
                  name="referralCouponCode"
                  type="text"
                  className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 text-center shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  value={referralCouponCode || ""}
                  onChange={(e) => {
                    setReferralCouponCode(e.target.value);
                  }}
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="voucherCode"
                  className="text-sm font-medium text-gray-700"
                >
                  Voucher Code
                </label>
                <input
                  id="voucherCode"
                  name="voucherCode"
                  type="text"
                  className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 text-center shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  value={voucherCode || ""}
                  onChange={(e) => {
                    setVoucherCode(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none disabled:opacity-50"
              onClick={handleCheckout}
              disabled={isPending}
            >
              Checkout
            </Button>
          </div>
        </>
      ) : (
        <p className="font-medium text-gray-700">Tickets not available</p>
      )}
    </section>
  );
};

export default FormTransaction;
