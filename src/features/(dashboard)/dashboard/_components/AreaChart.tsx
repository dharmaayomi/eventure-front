"use client";

import React from "react";
import {
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useGetTransactionPeriod from "@/hooks/api/transaction/useGetTransactionPeriod";

export function ThisAreaChart() {
  const [period, setPeriod] = React.useState<
    "daily" | "weekly" | "monthly" | "yearly"
  >("daily");
  const { data, isLoading, isError } = useGetTransactionPeriod(period);

  const chartData = data?.stats.map((item) => ({
    label: item.label,
    transactions: item.transactions,
    tickets: item.tickets,
  }));

  return (
    <Card className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <CardTitle className="text-xl font-semibold">
            Transactions & Tickets
          </CardTitle>
          <CardDescription>Total based on selected period</CardDescription>
        </div>
        <Select value={period} onValueChange={(val) => setPeriod(val as any)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Pilih Periode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <p className="text-center text-sm">Loading...</p>
        ) : isError ? (
          <p className="text-center text-sm text-red-500">Gagal memuat data.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300} className="w-full">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="label" />
              <YAxis
                yAxisId="left"
                width={60}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                width={60}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip
                formatter={(value: number, name: string) =>
                  `${value.toLocaleString()} ${name === "Transactions" ? "transactions" : "tickets"}`
                }
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="transactions"
                stroke="#004DE8"
                fill="#004DE8"
                fillOpacity={0.2}
                name="Transactions"
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-in-out"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="tickets"
                stroke="#00B2E3"
                fill="#00B2E3"
                fillOpacity={0.2}
                name="Tickets"
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-in-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
