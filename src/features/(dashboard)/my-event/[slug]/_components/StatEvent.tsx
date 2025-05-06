"use client";

import { useEffect, useState } from "react";

import useGetTransactionPerEventSummary from "@/hooks/api/organizer/useGetTransactionPerEventSummary";
import { ChartNoAxesCombined, DollarSign, TicketCheck } from "lucide-react";

type MetricCardProps = {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string; // Tailwind color like "blue", "green"
  delay: number;
  description: string;
};

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  delay,
  description,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = value / 50;
      const animate = () => {
        setCount((prev) => {
          if (prev + increment >= value) return value;
          return prev + increment;
        });
      };
      const intervalId = setInterval(animate, 30);
      return () => clearInterval(intervalId);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div
      className={`transform rounded-xl border bg-white from-white p-6 transition-all duration-300 hover:scale-102 hover:bg-gradient-to-br hover:shadow-xl to-${color}-50`}
      style={{ animationDelay: `${delay}ms` }}
      role="article"
      aria-label={`${title} metrics card`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-600">{title}</h3>
        <Icon className={`text-${color}-600 text-2xl`} />
      </div>
      <div className="flex items-center gap-1 text-3xl font-bold text-gray-800">
        {title === "Total Revenue" && (
          <DollarSign className={`text-${color}-600 text-xl`} />
        )}
        {Math.round(count).toLocaleString()}
      </div>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
};

type StatEventProps = {
  slug: string;
};
const StatEvent: React.FC<StatEventProps> = ({ slug }) => {
  //   const params = useParams();
  //   const slug = params?.slug as string;
  const { data, isLoading } = useGetTransactionPerEventSummary(slug);

  if (isLoading || !data) {
    return (
      <div className="p-8 text-center text-gray-500">Loading dashboard...</div>
    );
  }

  const totalRevenue = data.totalRevenue || 0;
  const totalTransactions = data.totalTransactions || 0;
  const totalTickets = data.totalTicket || 0;
  console.log(
    `ini punya event ${slug}`,
    totalRevenue,
    totalTransactions,
    totalTickets,
  );

  return (
    <div className="mx-auto mt-8 max-w-7xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <MetricCard
          title="Total Revenue"
          value={totalRevenue}
          icon={DollarSign}
          color="blue"
          delay={0}
          description="Total income from ticket sales."
        />
        <MetricCard
          title="Total Transactions"
          value={totalTransactions}
          icon={ChartNoAxesCombined}
          color="purple"
          delay={200}
          description="Number of completed user purchases."
        />
        <MetricCard
          title="Total Tickets"
          value={totalTickets}
          icon={TicketCheck}
          color="green"
          delay={400}
          description="Total tickets sold across this events."
        />
      </div>
    </div>
  );
};

export default StatEvent;
