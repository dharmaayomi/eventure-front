import { ReferralCoupon } from "./referralCoupon";
import { Review } from "./review";
import { Status } from "./status";
import { Ticket } from "./ticket";
import { TransactionDetail } from "./transactionDetail";
import { User } from "./user";
import { Voucher } from "./voucher";

export interface Transaction {
  uuid: string;
  userId: number;
  user: User;
  referralCouponUsed?: string;
  referralCoupon?: ReferralCoupon;
  voucherUsed?: string;
  voucher?: Voucher;
  totalAmount: number;
  status: Status;
  usePoints: boolean;
  pointsUsed: number;
  paymentProof?: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  review: Review[];
  transactionDetails: TransactionDetail[];
  tickets?: Ticket;
  ticketId?: number;
}
