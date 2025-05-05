import { Transaction } from "./transaction";

export interface TransactionSummaryResponse {
  transactions: Transaction[];
  totalCount: number;
  totalRevenue: number;
  totalTicket: number;
}
