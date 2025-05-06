import { ThisAreaChart } from "./AreaChart";
import CardMetrics from "./CardMetrics";
import CardTotalEvent from "./CardTotalEvent";
import RevenueCard from "./RevenueCard";

const DashboardList = () => {
  return (
    // <div className="flex flex-1 flex-col gap-4 p-4">
    //   <ChartAgain />

    //   <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    // </div>
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <CardMetrics />
        {/* <MonthlySalesChart /> */}
        <RevenueCard />
      </div>

      <div className="col-span-12 xl:col-span-5">
        {/* <ChartAgain /> */}
        <CardTotalEvent />
      </div>

      <div className="col-span-12">
        <ThisAreaChart />
      </div>

      <div className="col-span-12 xl:col-span-5"></div>

      <div className="col-span-12 xl:col-span-7"></div>
    </div>
  );
};

export default DashboardList;
