import { Event } from "./event";
import { Transaction } from "./transaction";

export interface Voucher {
  id: number;
  eventId: number;
  event: Event;
  code: string;
  discountAmount: number;
  startDate: Date;
  endDate: Date;
  qty: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  transactions: Transaction[];
}
