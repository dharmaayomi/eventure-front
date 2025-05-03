"use client";

import DatePicker from "@/components/ui/datepicker";

const BankPage = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      {/* <InlineDatepicker />
      <DatePickerInput /> */}
      <DatePicker />
    </div>
  );
};

export default BankPage;
