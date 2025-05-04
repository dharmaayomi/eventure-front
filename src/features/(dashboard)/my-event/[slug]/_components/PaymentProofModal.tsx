// components/PaymentProofModal.tsx
import { X } from "lucide-react";
import Image from "next/image";

interface PaymentProofModalProps {
  show: boolean;
  proofUrl: string | null;
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
}

const PaymentProofModal: React.FC<PaymentProofModalProps> = ({
  show,
  proofUrl,
  onClose,
  onAccept,
  onReject,
}) => {
  if (!show || !proofUrl) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="mx-4 w-full max-w-2xl rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Payment Proof</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <Image
          src={proofUrl}
          alt="Payment Proof"
          className="mb-4 h-auto w-full rounded-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1560518883-ce09059eeffa";
          }}
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onReject}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Reject Payment
          </button>
          <button
            onClick={onAccept}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Accept Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentProofModal;
