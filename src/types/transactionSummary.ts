import { Transaction, TransactionWithTotal } from "./transaction";

export interface TransactionSummaryResponse {
  transactions: TransactionWithTotal[];
  totalTransactions: number;
  totalRevenue: number;
  totalTicket: number;
}
