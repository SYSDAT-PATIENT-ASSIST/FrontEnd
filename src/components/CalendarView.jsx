import React from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  getDay,
} from "date-fns";


export default function CalendarView({ selectedDate, setSelectedDate, activeDishes,SetActiveDishes }) {
  const today = new Date();
  const days = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startDay = getDay(startOfMonth(today));

  return (
    <div className="team-e__calendar">
      <h2 className="team-e__subtitle">Select a Date</h2>

      {/* Ugedage */}
      <div className="team-e__calendar-weekdays">
        {weekdays.map((weekday) => (
          <div key={weekday} className="team-e__weekday">
            {weekday}
          </div>
        ))}
      </div>

      {/* Dage */}
      <div className="team-e__calendar-days">
        {Array.from({ length: startDay }).map((_, idx) => (
          <div key={`empty-${idx}`} className="team-e__day empty"></div>
        ))}
        {days.map((day) => (
          <button
            key={day.toISOString()}
            onClick={() => setSelectedDate(day)}
            className={`team-e__day ${isSameDay(day, selectedDate) ? "selected" : ""}`}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>
    </div>
  );
}
