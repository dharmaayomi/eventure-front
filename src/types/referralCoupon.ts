import { Transaction } from "./transaction";
import { User } from "./user";

export interface ReferralCoupon {
  id: number;
  userId: number;
  user: User;
  referralCoupon: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  expiredAt: Date;
  isClaimed: boolean;
  isDeleted: boolean;
  transaction: Transaction[];
}
