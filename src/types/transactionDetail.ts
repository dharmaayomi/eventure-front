import { Ticket } from "./ticket";
import { Transaction } from "./transaction";

export interface TransactionDetail {
  id: number;
  transactionId: string;
  transaction: Transaction;
  ticketId: number;
  ticket: Ticket;
  qty: number;
}
