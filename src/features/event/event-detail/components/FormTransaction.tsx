// "use client";

// import { Button } from "@/components/ui/button";
// import useCreateTransaction from "@/hooks/api/transaction/useCreateTransaction";
// import { Event } from "@/types/event";
// import { FC, useState } from "react";

// interface FormTransactionProps {
//   event: Event;
// }

// const FormTransaction: FC<FormTransactionProps> = ({ event }) => {
//   const { mutateAsync: createTransaction, isPending } = useCreateTransaction();
//   const [selectedTickets, setSelectedTickets] = useState<{
//     [ticketId: number]: number;
//   }>({});
//   const [usePoints, setUsePoints] = useState<boolean>(false);
//   const [referralCouponCode, setReferralCouponCode] = useState<string>("");
//   const [voucherCode, setVoucherCode] = useState<string>("");

//   const rupiah = (price: number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//     }).format(price);
//   };

//   const handleSelectTix = (ticketId: number) => {
//     setSelectedTickets((currentSelection) => {
//       if (currentSelection[ticketId]) {
//         const update = { ...currentSelection };
//         delete update[ticketId];
//         return update;
//       } else {
//         return { ...currentSelection, [ticketId]: 1 };
//       }
//     });
//   };

//   const handleQtyTix = (ticketId: number, qty: number) => {
//     setSelectedTickets((currentSelection) => {
//       if (currentSelection[ticketId]) {
//         return { ...currentSelection, [ticketId]: qty };
//       }
//       return currentSelection;
//     });
//   };

//   const handleCheckout = async () => {
//     const details = Object.keys(selectedTickets).map((ticketId) => ({
//       ticketId: Number(ticketId),
//       qty: selectedTickets[Number(ticketId)],
//     }));

//     const payload = {
//       details,
//       referralCouponCode,
//       voucherCode,
//       usePoints,
//     };
//     console.log("sending to backend", payload);
//     await createTransaction(payload);
//   };

//   return (
//     <section className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
//       <p className="text-lg font-semibold text-indigo-700">
//         🎟️ Available Tickets
//       </p>

//       {event.tickets.length > 0 ? (
//         <>
//           <ul className="list-none divide-y divide-gray-200 rounded-md">
//             {event.tickets?.map((ticket) => (
//               <li
//                 key={ticket.id}
//                 className="flex flex-col items-start justify-between gap-3 py-4 sm:flex-row sm:items-center"
//               >
//                 <div className="flex items-center">
//                   <input
//                     id="ticketId"
//                     name="ticketId"
//                     type="checkbox"
//                     className="form-checkbox mr-3 h-5 w-5 text-indigo-600"
//                     checked={!!selectedTickets[ticket.id]}
//                     onChange={() => {
//                       handleSelectTix(ticket.id);
//                     }}
//                   />
//                   <div>
//                     <p className="font-semibold text-gray-800">
//                       {ticket.ticketType.toUpperCase()}
//                     </p>
//                     <p className="text-xs text-gray-500">Click to select</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <p className="text-sm font-bold text-green-600 sm:text-base">
//                     {rupiah(ticket.price)}
//                   </p>

//                   {selectedTickets[ticket.id] && (
//                     <div className="flex items-center gap-2">
//                       <input
//                         id="qty"
//                         name="qty"
//                         type="number"
//                         min="1"
//                         className="focus:ring-opacity-50 w-20 rounded-md border border-gray-300 text-center shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
//                         value={selectedTickets[ticket.id] || 0}
//                         onChange={(e) => {
//                           handleQtyTix(ticket.id, e.target.valueAsNumber);
//                         }}
//                       />
//                       <span className="text-xs text-gray-500">Qty</span>
//                     </div>
//                   )}
//                 </div>
//               </li>
//             ))}
//           </ul>

//           <div className="space-y-4">
//             <div className="flex items-center gap-2">
//               <input
//                 id="usePoints"
//                 name="usePoints"
//                 type="checkbox"
//                 className="form-checkbox h-5 w-5 text-indigo-600"
//                 checked={usePoints}
//                 onChange={(e) => {
//                   setUsePoints(e.target.checked);
//                 }}
//               />
//               <label htmlFor="usePoints" className="text-sm text-gray-800">
//                 Use my reward points ✨
//               </label>
//             </div>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div className="space-y-1">
//                 <label
//                   htmlFor="referralCouponCode"
//                   className="text-sm font-medium text-gray-700"
//                 >
//                   Coupon Code
//                 </label>
//                 <input
//                   id="referralCouponCode"
//                   name="referralCouponCode"
//                   type="text"
//                   className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 text-center shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
//                   value={referralCouponCode || ""}
//                   onChange={(e) => {
//                     setReferralCouponCode(e.target.value);
//                   }}
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label
//                   htmlFor="voucherCode"
//                   className="text-sm font-medium text-gray-700"
//                 >
//                   Voucher Code
//                 </label>
//                 <input
//                   id="voucherCode"
//                   name="voucherCode"
//                   type="text"
//                   className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 text-center shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
//                   value={voucherCode || ""}
//                   onChange={(e) => {
//                     setVoucherCode(e.target.value);
//                   }}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end">
//             <Button
//               className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none disabled:opacity-50"
//               onClick={handleCheckout}
//               disabled={isPending}
//             >
//               Checkout
//             </Button>
//           </div>
//         </>
//       ) : (
//         <p className="font-medium text-gray-700">Tickets not available</p>
//       )}
//     </section>
//   );
// };

// export default FormTransaction;
"use client";

import { Button } from "@/components/ui/button";
import useGetProfile from "@/hooks/api/profile/useGetProfile";
import useCreateTransaction from "@/hooks/api/transaction/useCreateTransaction";
import { Event } from "@/types/event";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";

interface FormTransactionProps {
  event: Event;
}

const FormTransaction: FC<FormTransactionProps> = ({ event }) => {
  const session = useSession();
  const userId = session.data?.user.id;
  const { data: profile } = useGetProfile(userId!);
  const { mutateAsync: createTransaction, isPending } = useCreateTransaction();
  const [selectedTickets, setSelectedTickets] = useState<{
    [ticketId: number]: number;
  }>({});
  const [usePoints, setUsePoints] = useState<boolean>(false);
  const [referralCouponCode, setReferralCouponCode] = useState<string>("");
  const [voucherCode, setVoucherCode] = useState<string>("");
  const pointAmount = profile?.pointDetails?.[0]?.amount ?? 0;
  console.log("point", profile);

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
    <section
      className="space-y-6 rounded-xl border border-gray-100 bg-white p-6 shadow-lg"
      style={{ boxShadow: "0 10px 25px -5px rgba(0, 77, 232, 0.1)" }}
    >
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#004DE8] to-[#0062ff]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            />
          </svg>
        </div>
        <p className="text-lg font-bold" style={{ color: "#004DE8" }}>
          Select Your Tickets
        </p>
      </div>

      {event.tickets.length > 0 ? (
        <>
          <ul className="list-none divide-y divide-gray-100 rounded-md">
            {event.tickets?.map((ticket) => (
              <li
                key={ticket.id}
                className={`flex flex-col items-start justify-between gap-3 py-4 transition-all duration-200 sm:flex-row sm:items-center ${
                  selectedTickets[ticket.id]
                    ? "-mx-4 rounded-lg bg-[#004DE8]/5 px-4"
                    : ""
                }`}
              >
                <div className="flex items-center">
                  <div className="relative mr-3">
                    <input
                      id={`ticket-${ticket.id}`}
                      name="ticketId"
                      type="checkbox"
                      className="peer absolute h-5 w-5 cursor-pointer opacity-0"
                      checked={!!selectedTickets[ticket.id]}
                      onChange={() => {
                        handleSelectTix(ticket.id);
                      }}
                    />
                    <div className="pointer-events-none h-5 w-5 rounded border border-gray-300 bg-white peer-checked:border-[#004DE8] peer-checked:bg-[#004DE8]"></div>
                    <svg
                      className="pointer-events-none absolute top-0.5 left-0.5 h-4 w-4 text-white opacity-0 peer-checked:opacity-100"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">
                      {ticket.ticketType.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Limited availability
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-sm font-bold text-[#004DE8] sm:text-base">
                    {rupiah(ticket.price)}
                  </p>

                  {selectedTickets[ticket.id] && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-lg border border-gray-200 bg-white">
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center text-gray-500 hover:text-[#004DE8] focus:outline-none disabled:opacity-50"
                          onClick={() =>
                            handleQtyTix(
                              ticket.id,
                              Math.max(
                                1,
                                (selectedTickets[ticket.id] || 1) - 1,
                              ),
                            )
                          }
                          disabled={selectedTickets[ticket.id] <= 1}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <input
                          id="qty"
                          name="qty"
                          type="number"
                          min="1"
                          className="w-12 border-none bg-transparent text-center focus:outline-none"
                          value={selectedTickets[ticket.id] || 0}
                          onChange={(e) => {
                            handleQtyTix(
                              ticket.id,
                              Math.max(1, e.target.valueAsNumber),
                            );
                          }}
                        />
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center text-gray-500 hover:text-[#004DE8] focus:outline-none"
                          onClick={() =>
                            handleQtyTix(
                              ticket.id,
                              (selectedTickets[ticket.id] || 0) + 1,
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="space-y-4 rounded-lg bg-gray-50 p-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  id="usePoints"
                  name="usePoints"
                  type="checkbox"
                  className="peer absolute h-5 w-5 cursor-pointer opacity-0"
                  checked={usePoints}
                  onChange={(e) => {
                    setUsePoints(e.target.checked);
                  }}
                />
                <div className="pointer-events-none h-5 w-5 rounded border border-gray-300 bg-white peer-checked:border-[#004DE8] peer-checked:bg-[#004DE8]"></div>
                <svg
                  className="pointer-events-none absolute top-0.5 left-0.5 h-4 w-4 text-white opacity-0 peer-checked:opacity-100"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <label
                htmlFor="usePoints"
                className="flex items-center gap-1 text-sm font-medium text-gray-800"
              >
                Use my reward points
                <span className="inline-flex items-center rounded-full bg-[#004DE8]/10 px-2 py-0.5 text-xs font-medium text-[#004DE8]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  {pointAmount.toLocaleString()} points available
                </span>
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
                <div className="relative">
                  <input
                    id="referralCouponCode"
                    name="referralCouponCode"
                    type="text"
                    className="w-full rounded-md border border-gray-300 py-2 pr-3 pl-8 text-sm placeholder-gray-400 shadow-sm focus:border-[#004DE8] focus:ring-1 focus:ring-[#004DE8] focus:outline-none"
                    placeholder="Enter coupon code"
                    value={referralCouponCode || ""}
                    onChange={(e) => {
                      setReferralCouponCode(e.target.value);
                    }}
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="voucherCode"
                  className="text-sm font-medium text-gray-700"
                >
                  Voucher Code
                </label>
                <div className="relative">
                  <input
                    id="voucherCode"
                    name="voucherCode"
                    type="text"
                    className="w-full rounded-md border border-gray-300 py-2 pr-3 pl-8 text-sm placeholder-gray-400 shadow-sm focus:border-[#004DE8] focus:ring-1 focus:ring-[#004DE8] focus:outline-none"
                    placeholder="Enter voucher code"
                    value={voucherCode || ""}
                    onChange={(e) => {
                      setVoucherCode(e.target.value);
                    }}
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
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
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button
              className="w-full items-center justify-center gap-2 rounded-lg bg-[#004DE8] py-3 text-base font-semibold text-white shadow-md transition hover:bg-[#0040c0] focus:ring-2 focus:ring-[#004DE8] focus:ring-offset-2 focus:outline-none disabled:opacity-50"
              onClick={handleCheckout}
              disabled={isPending || Object.keys(selectedTickets).length === 0}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Checkout
                </div>
              )}
            </Button>
          </div>
        </>
      ) : (
        <div className="rounded-lg bg-gray-50 p-6 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="mt-4 font-medium text-gray-700">
            Tickets not available
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Check back later or contact the organizer for more information.
          </p>
        </div>
      )}
    </section>
  );
};

export default FormTransaction;
