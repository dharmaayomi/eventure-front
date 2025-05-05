// "use client";

// import { X } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";

// interface PaymentProofModalProps {
//   show: boolean;
//   proofUrl: string | null;
//   transactionId: string | null;
//   transactionStatus: string;
//   onClose: () => void;
//   onAccept: () => void;
//   onReject: () => void;
//   isProcessing?: boolean;
// }

// const PaymentProofModal: React.FC<PaymentProofModalProps> = ({
//   show,
//   proofUrl,
//   transactionId,
//   transactionStatus = "PENDING",
//   onClose,
//   onAccept,
//   onReject,
//   isProcessing = false,
// }) => {
//   const [imageError, setImageError] = useState(false);

//   if (!show || !proofUrl) return null;

//   // Display a placeholder if image fails to load
//   const handleImageError = () => {
//     setImageError(true);
//   };

//   return (
//     <div className="bg-opacity-50 fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
//       <div className="mx-4 w-full max-w-2xl rounded-lg bg-white p-6">
//         <div className="mb-4 flex items-center justify-between">
//           <h3 className="text-xl font-semibold">
//             Payment Proof
//             {transactionId && (
//               <span className="ml-2 text-sm text-gray-500">
//                 (ID: {transactionId})
//               </span>
//             )}
//           </h3>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <div className="mb-4 flex justify-center">
//           {imageError ? (
//             <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gray-100">
//               <p className="text-gray-500">
//                 Unable to load payment proof image
//               </p>
//             </div>
//           ) : (
//             <div className="relative h-80 w-full">
//               <Image
//                 src={proofUrl}
//                 alt="Payment Proof"
//                 className="rounded-lg object-contain"
//                 fill
//                 sizes="(max-width: 768px) 100vw, 800px"
//                 priority
//                 onError={handleImageError}
//               />
//             </div>
//           )}
//         </div>

//         {transactionStatus === "WAITING_CONFIRMATION" && (
//           <div className="flex justify-end gap-4">
//             <button
//               onClick={onReject}
//               disabled={isProcessing}
//               className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {isProcessing ? "Processing..." : "Reject Payment"}
//             </button>
//             <button
//               onClick={onAccept}
//               disabled={isProcessing}
//               className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {isProcessing ? "Processing..." : "Accept Payment"}
//             </button>
//           </div>
//         )}

//         {transactionStatus === "DONE" && (
//           <div className="rounded-lg bg-green-50 p-4 text-center text-green-800">
//             This payment has been accepted
//           </div>
//         )}

//         {transactionStatus === "REJECTED" && (
//           <div className="rounded-lg bg-red-50 p-4 text-center text-red-800">
//             This payment has been rejected
//           </div>
//         )}

//         {transactionStatus === "WAITING_FOR_PAYMENT" && (
//           <div className="rounded-lg bg-yellow-50 p-4 text-center text-yellow-800">
//             Waiting for payment from user
//           </div>
//         )}

//         {transactionStatus === "EXPIRED" && (
//           <div className="rounded-lg bg-gray-50 p-4 text-center text-gray-800">
//             This transaction has expired
//           </div>
//         )}

//         {transactionStatus === "CANCELED" && (
//           <div className="rounded-lg bg-gray-50 p-4 text-center text-gray-800">
//             This transaction has been canceled
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentProofModal;
"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface PaymentProofModalProps {
  show: boolean;
  proofUrl: string | null;
  transactionId: string | null;
  transactionStatus: string;
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
  isProcessing?: boolean;
}

const PaymentProofModal: React.FC<PaymentProofModalProps> = ({
  show,
  proofUrl,
  transactionId,
  transactionStatus = "PENDING",
  onClose,
  onAccept,
  onReject,
  isProcessing = false,
}) => {
  const [imageError, setImageError] = useState(false);

  if (!show || !proofUrl) return null;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all duration-300">
      <div className="mx-4 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl transition-transform duration-300">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">
            Payment Proof
            {transactionId && (
              <span className="ml-2 text-sm text-gray-500">
                (ID: {transactionId})
              </span>
            )}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 transition hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-4 flex justify-center">
          {imageError ? (
            <div className="flex h-64 w-full items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-center text-gray-500">
              Unable to load payment proof image
            </div>
          ) : (
            <div className="relative h-80 w-full">
              <Image
                src={proofUrl}
                alt="Payment Proof"
                className="rounded-xl object-contain"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                priority
                onError={handleImageError}
              />
            </div>
          )}
        </div>

        {transactionStatus === "WAITING_CONFIRMATION" && (
          <div className="flex justify-end gap-4">
            <button
              onClick={onReject}
              disabled={isProcessing}
              className="rounded-lg border border-red-500 bg-red-500 px-5 py-2 font-medium text-white shadow transition hover:bg-red-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : "Reject Payment"}
            </button>
            <button
              onClick={onAccept}
              disabled={isProcessing}
              className="rounded-lg border border-green-500 bg-green-500 px-5 py-2 font-medium text-white shadow transition hover:bg-green-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : "Accept Payment"}
            </button>
          </div>
        )}

        {transactionStatus === "DONE" && (
          <div className="mt-4 rounded-xl bg-green-100 p-4 text-center text-sm font-medium text-green-700 shadow-sm">
            This payment has been accepted
          </div>
        )}

        {transactionStatus === "REJECTED" && (
          <div className="mt-4 rounded-xl bg-red-100 p-4 text-center text-sm font-medium text-red-700 shadow-sm">
            This payment has been rejected
          </div>
        )}

        {transactionStatus === "WAITING_FOR_PAYMENT" && (
          <div className="mt-4 rounded-xl bg-yellow-100 p-4 text-center text-sm font-medium text-yellow-700 shadow-sm">
            Waiting for payment from user
          </div>
        )}

        {transactionStatus === "EXPIRED" && (
          <div className="mt-4 rounded-xl bg-gray-100 p-4 text-center text-sm font-medium text-gray-700 shadow-sm">
            This transaction has expired
          </div>
        )}

        {transactionStatus === "CANCELED" && (
          <div className="mt-4 rounded-xl bg-gray-100 p-4 text-center text-sm font-medium text-gray-700 shadow-sm">
            This transaction has been canceled
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentProofModal;
