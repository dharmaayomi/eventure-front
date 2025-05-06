// types/TransactionStats.ts

export type TransactionStat = {
  label: string; // e.g., "2025-05-03"
  transactions: number;
  tickets: number;
  revenue: number;
};

export type TransactionSummary = {
  totalTransactions: number;
  totalTickets: number;
  totalRevenue: number;
};

export type TransactionStatsResponse = {
  period: "daily" | "weekly" | "monthly"; // or extend based on possible values
  stats: TransactionStat[];
  summary: TransactionSummary;
};
