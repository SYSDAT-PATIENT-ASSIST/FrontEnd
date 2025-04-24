import React, { useState, useEffect } from 'react';
import '../styles/CalenderVisual.css';

const days = ['Ma', 'Ti', 'On', 'To', 'Fr', 'Lø', 'Sø'];

const CalenderVisual = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentYear] = useState(today.getFullYear());
  const [currentMonth] = useState(today.getMonth());
  const [calendarDates, setCalendarDates] = useState([]);

  const generateCalendarDates = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = (firstDay.getDay() + 6) % 7; // Monday = 0
    const totalDays = lastDay.getDate();

    const prevMonthLastDate = new Date(year, month, 0).getDate();
    const dates = [];

    // Previous month's days
    for (let i = startDay - 1; i >= 0; i--) {
      dates.push({
        day: prevMonthLastDate - i,
        monthOffset: -1,
      });
    }

    // Current month's days
    for (let i = 1; i <= totalDays; i++) {
      dates.push({
        day: i,
        monthOffset: 0,
      });
    }

    // Next month's days
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

  return (
    <div className="calendar-container">
      <div className="day-labels-row">
        {days.map((day) => (
          <div className="day-label" key={day}>{day}</div>
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
            selectedDate &&
            day === selectedDate.day &&
            monthOffset === 0;

          const classNames = ['day-cell'];
          if (!isCurrentMonth) classNames.push('other-month');
          //if (isToday) classNames.push('current'); /* current day highlight */
          if (isSelected) classNames.push('selected');

          return (
            <div
              key={index}
              className={classNames.join(' ')}
              onClick={() =>
                isCurrentMonth && setSelectedDate({ day })
              }
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalenderVisual;
