import { ReferralCoupon } from "./referralCoupon";
import { Review } from "./review";
import { Status } from "./status";
import { Ticket } from "./ticket";
import { User } from "./user";
import { Voucher } from "./voucher";

export interface Transaction {
  id: number;
  uuid: string;
  userId: number;
  user: User;
  ticketId: number;
  ticket: Ticket;
  referralCouponCode: string;
  voucherCode: string;
  qty: number;
  totalAmount: number;
  status: Status;
  usePoints: boolean;
  paymentProof?: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  review: Review[];
  referralCoupon?: ReferralCoupon;
  referralCouponId?: number;
  voucher?: Voucher;
  voucherId?: number;
}
