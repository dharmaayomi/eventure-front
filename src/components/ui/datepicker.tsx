import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./button";

type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(value || new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(value || new Date());
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
    setIsOpen(false);
    onChange?.(day);
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between border-b bg-white p-4">
      <Button
        onClick={handlePrevMonth}
        className="rounded-full p-2 transition-colors hover:bg-gray-100"
        aria-label="Previous month"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600" />
      </Button>
      <h2 className="font-semibold text-gray-800">
        {format(currentMonth, "MMMM yyyy")}
      </h2>
      <button
        onClick={handleNextMonth}
        className="rounded-full p-2 transition-colors hover:bg-gray-100"
        aria-label="Next month"
      >
        <ChevronRight className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );

  const renderDays = () => {
    const dateFormat = "EEEE";
    const days = [];
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          className="p-2 text-center text-sm font-medium text-gray-600"
          key={i}
        >
          {format(addDays(startDate, i), dateFormat).substring(0, 2)}
        </div>,
      );
    }
    return <div className="grid grid-cols-7 bg-gray-50">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        days.push(
          <div
            key={day.toString()}
            onClick={() => handleDateClick(cloneDay)}
            className={`relative cursor-pointer p-2 text-center transition-colors hover:bg-blue-50 ${!isSameMonth(day, monthStart) ? "text-gray-400" : "text-gray-700"} ${isSameDay(day, selectedDate) ? "bg-blue-500 text-white hover:bg-blue-600" : ""} ${isSameDay(day, new Date()) ? "font-bold" : ""} `}
            role="button"
            tabIndex={0}
            aria-label={format(cloneDay, "PPP")}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full">
              {format(day, "d")}
            </span>
          </div>,
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>,
      );
      days = [];
    }
    return <div className="bg-white">{rows}</div>;
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <div className="relative">
        <input
          type="text"
          readOnly
          value={format(selectedDate, "PPP")}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full cursor-pointer rounded-lg border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Select a date"
        />
        <button
          onClick={() => {
            const today = new Date();
            setSelectedDate(today);
            setCurrentMonth(today);
            setIsOpen(false);
            onChange?.(today);
          }}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 transition-colors hover:bg-gray-100"
          aria-label="Clear date"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>
        {isOpen && (
          <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border bg-white shadow-lg">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
