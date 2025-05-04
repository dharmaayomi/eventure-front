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

  const handleSubmit = async () => {
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
    console.log(payload);
    await createTransaction(payload);
  };

  return (
    <section className="mt-5 space-y-6 rounded-md border border-gray-300 bg-white p-4 shadow-sm">
      {event.tickets.length > 0 ? (
        <>
          <ul className="list-none divide-y divide-gray-200 rounded-md">
            {event.tickets?.map((ticket) => (
              <li
                key={ticket.id}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center">
                  <input
                    id="ticketId"
                    name="ticketId"
                    type="checkbox"
                    className="form-checkbox mr-3 h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    checked={!!selectedTickets[ticket.id]}
                    onChange={() => {
                      handleSelectTix(ticket.id);
                    }}
                  />
                  <p className="font-medium text-gray-700">
                    {ticket.ticketType.toUpperCase()}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <p className="font-bold text-green-600">
                    {rupiah(ticket.price)}
                  </p>

                  {selectedTickets[ticket.id] && (
                    <input
                      id="qty"
                      name="qty"
                      type="number"
                      min="1"
                      className="w-20 rounded-md border border-gray-300 text-center"
                      value={selectedTickets[ticket.id] || 0}
                      onChange={(e) => {
                        handleQtyTix(ticket.id, e.target.valueAsNumber);
                      }}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                id="usePoints"
                name="usePoints"
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                checked={usePoints}
                onChange={(e) => {
                  console.log("Checkbox clicked:", e.target.checked);
                  setUsePoints(e.target.checked);
                }}
              />
              <label htmlFor="usePoints" className="text-sm text-gray-800">
                Use Points
              </label>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-700">Coupon Code</p>
              <input
                id="referralCouponCode"
                name="referralCouponCode"
                type="text"
                className="w-32 rounded-md border border-gray-300 text-center"
                value={referralCouponCode || ""}
                onChange={(e) => {
                  setReferralCouponCode(e.target.value);
                }}
              />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-700">Voucher Code</p>
              <input
                id="voucherCode"
                name="voucherCode"
                type="text"
                className="w-32 rounded-md border border-gray-300 text-center"
                value={voucherCode || ""}
                onChange={(e) => {
                  setVoucherCode(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              className="focus:shadow-outline rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-700 focus:outline-none"
              onClick={handleSubmit}
              disabled={isPending}
            >
              Submit
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
