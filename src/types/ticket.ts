import { Event } from "./event";
import { Transaction } from "./transaction";
import { TransactionDetail } from "./transactionDetail";

export interface Ticket {
  id: number;
  eventId: number;
  event: Event;
  ticketType: string;
  price: number;
  qty: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  transactions: Transaction[];
  transactionDetails: TransactionDetail[];
}
