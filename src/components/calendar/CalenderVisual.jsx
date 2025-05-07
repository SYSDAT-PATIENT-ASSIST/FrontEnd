import React, { useState, useEffect } from "react";
import "../../styles/calendar/CalenderVisual.css";

const days = ["Ma", "Ti", "On", "To", "Fr", "Lø", "Sø"];

// MOCK EVENTS ADDED
const mockEvents = {
  4: [{ time: "14:00", title: "Occupational Therapy" }],
  9: [
    { time: "07:45", title: "Vital Signs Check" },
    { time: "11:00", title: "Nutritionist Meeting" },
    { time: "16:00", title: "Family Visit" },
  ],
  12: [{ time: "15:30", title: "Medication Review" }],
  15: [
    { time: "10:00", title: "X-Ray" },
    { time: "14:00", title: "Wound Dressing" },
  ],
  21: [{ time: "13:45", title: "Counseling Session" }],
};

const CalenderVisual = () => {
  const today = new Date();
  
  
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarDates, setCalendarDates] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  
  const getOneYearBefore = () => {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() - 12, 1);
  };
  
  const getOneYearAfter = () => {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 12, 1);
  };
  
  const isWithinOneYear = (year, month) => {
    const viewingDate = new Date(year, month, 1);
    return viewingDate >= getOneYearBefore() && viewingDate <= getOneYearAfter();
  };
  

  const isPreviousMonthDisabled = () => {
    return !isWithinOneYear(currentYear, currentMonth - 1);
  };
  
  const isNextMonthDisabled = () => {
    return !isWithinOneYear(currentYear, currentMonth + 1);
  };  

  const changeMonth = (offset) => {
    setSelectedDate(null);

    const newDate = new Date(currentYear, currentMonth + offset, 1);
    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth();

    if (!isWithinOneYear(newYear, newMonth)) {
      return;
    }

    setCurrentYear(newYear);
    setCurrentMonth(newMonth);
  };
  
  
  

  const generateCalendarDates = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = (firstDay.getDay() + 6) % 7; // Monday = 0
    const totalDays = lastDay.getDate();

    const prevMonthLastDate = new Date(year, month, 0).getDate();
    const dates = [];

    for (let i = startDay - 1; i >= 0; i--) {
      dates.push({
        day: prevMonthLastDate - i,
        monthOffset: -1,
      });
    }

    for (let i = 1; i <= totalDays; i++) {
      dates.push({
        day: i,
        monthOffset: 0,
      });
    }

    const nextDays = 42 - dates.length;
    for (let i = 1; i <= nextDays; i++) {
      dates.push({
        day: i,
        monthOffset: 1,
      });
    }

    return dates;
  };

  
  useEffect(() => {
    setCalendarDates(generateCalendarDates(currentYear, currentMonth));
  }, [currentYear, currentMonth]);

  const handleDateClick = (date) => {
    if (selectedDate?.day === date.day) {
      setIsExpanded(!isExpanded);
    } else {
      setSelectedDate(date);
      setIsExpanded(true);
    }
  };

  const selectedDay = selectedDate?.day;
  const events = selectedDay ? mockEvents[selectedDay] || [] : [];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button
          className="nav-arrow"
          onClick={() => changeMonth(-1)}
          disabled={isPreviousMonthDisabled()}
        >
          ←
        </button>
        <div className="calendar-title">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}{" "}
          {currentYear}
        </div>
        <button
          className="nav-arrow"
          onClick={() => changeMonth(1)}
          disabled={isNextMonthDisabled()}
        >
          →
        </button>
      </div>

      <div className="day-labels-row">
        {days.map((day) => (
          <div className="day-label" key={day}>
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarDates.map((dateObj, index) => {
          const { day, monthOffset } = dateObj;

          const isCurrentMonth = monthOffset === 0;

          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear() &&
            isCurrentMonth;

          const isSelected =
            selectedDate && day === selectedDate.day && monthOffset === 0;

          const classNames = ["day-cell"];
          if (!isCurrentMonth) classNames.push("other-month");
          if (isToday) classNames.push("current");
          if (isSelected) classNames.push("selected");

          const hasEvent = isCurrentMonth && mockEvents[day];

          return (
            <div
              key={index}
              className={classNames.join(" ")}
              onClick={() => isCurrentMonth && handleDateClick({ day })}
            >
              <div className="day-number">{day}</div>
              {hasEvent && <div className="event-dot" />}
            </div>
          );
        })}
      </div>

      <div className={`event-panel ${isExpanded ? "expanded" : ""}`}>
        {events.length > 0
          ? events.map((event, idx) => (
              <div className="event-item" key={idx}>
                <span className="event-time">{event.time}</span>
                <span className="event-title">{event.title}</span>
              </div>
            ))
          : isExpanded && (
              <div className="event-item no-events">No events for this day</div>
            )}
      </div>
    </div>
  );
};

export default CalenderVisual;
