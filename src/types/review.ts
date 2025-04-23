import { Rating } from "./rating";
import { Transaction } from "./transaction";

export interface Review {
  id: number;
  transactionId: number;
  transaction: Transaction;
  review: string;
  rating: Rating;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
