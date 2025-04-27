import React from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, getDay } from "date-fns";

export default function CalendarView({ selectedDate, setSelectedDate }) {
  const today = new Date();
  const days = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startDay = getDay(startOfMonth(today));

  return (
    <div className="calendar">
      <h2 className="subtitle">Select a Date</h2>
      <div className="calendar-weekdays">
        {weekdays.map((weekday) => (
          <div key={weekday} className="weekday">{weekday}</div>
        ))}
      </div>
      <div className="calendar-days">
        {Array.from({ length: startDay }).map((_, idx) => (
          <div key={`empty-${idx}`} className="day empty"></div>
        ))}
        {days.map((day) => (
          <button
            key={day.toISOString()}
            onClick={() => setSelectedDate(day)}
            className={`day ${isSameDay(day, selectedDate) ? "selected" : ""}`}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>
    </div>
  );
}
