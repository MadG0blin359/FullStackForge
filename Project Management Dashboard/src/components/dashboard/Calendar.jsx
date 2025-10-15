import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState(new Set());

  const today = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Get first day of the month and last day
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay()); // Start from Sunday

  const endDate = new Date(lastDay);
  endDate.setDate(endDate.getDate() + (6 - lastDay.getDay())); // End on Saturday

  // Generate calendar days
  const calendarDays = [];
  let day = new Date(startDate);
  while (day <= endDate) {
    calendarDays.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleDateClick = (date) => {
    const dateKey = date.toDateString();
    const newSelected = new Set(selectedDates);
    if (newSelected.has(dateKey)) {
      newSelected.delete(dateKey);
    } else {
      newSelected.add(dateKey);
    }
    setSelectedDates(newSelected);
  };

  const isToday = (date) => {
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentMonth;
  };

  const isSelected = (date) => {
    return selectedDates.has(date.toDateString());
  };

  return (
    <div
      className="w-full max-w-md mx-auto rounded-xl shadow-lg border p-6 transition-all duration-500 ease-in-out"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
        boxShadow: "0 4px 24px var(--card-shadow)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CalendarIcon size={24} style={{ color: "var(--accent-primary)" }} />
          <h3
            className="text-xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {monthNames[currentMonth]} {currentYear}
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-lg hover:scale-110 active:scale-95 cursor-pointer transition-all duration-200"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-secondary)",
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-lg hover:scale-110 active:scale-95 cursor-pointer transition-all duration-200"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-secondary)",
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((dayName) => (
          <div
            key={dayName}
            className="text-center py-2 text-sm font-semibold"
            style={{ color: "var(--text-tertiary)" }}
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => {
          const isCurrentMonthDay = isCurrentMonth(date);
          const isTodayDay = isToday(date);
          const isSelectedDay = isSelected(date);

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              className={`
                relative h-10 w-10 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200
                hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2
                ${isSelectedDay ? "ring-2 ring-offset-2" : ""}
              `}
              style={{
                backgroundColor: isSelectedDay
                  ? "var(--accent-primary)"
                  : isTodayDay
                  ? "var(--bg-secondary)"
                  : "transparent",
                color: isSelectedDay
                  ? "white"
                  : isCurrentMonthDay
                  ? "var(--text-primary)"
                  : "var(--text-tertiary)",
                border:
                  isTodayDay && !isSelectedDay
                    ? "2px solid var(--accent-primary)"
                    : "none",
                ringColor: "var(--accent-primary)",
                ringOffsetColor: "var(--card-bg)",
              }}
              title={`${date.toDateString()}`}
            >
              {date.getDate()}
              {isTodayDay && !isSelectedDay && (
                <div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ backgroundColor: "var(--accent-primary)" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t flex justify-between items-center text-sm">
        <div
          className="flex items-center gap-2"
          style={{ color: "var(--text-tertiary)" }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "var(--accent-primary)" }}
          />
          <span>Today</span>
        </div>
        <div
          className="flex items-center gap-2"
          style={{ color: "var(--text-tertiary)" }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "var(--accent-secondary)" }}
          />
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
