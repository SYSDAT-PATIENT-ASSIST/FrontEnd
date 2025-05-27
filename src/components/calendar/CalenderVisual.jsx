import React, { useState, useEffect } from "react";
import "../../styles/calendar/CalenderVisual.css";
import { useTranslation } from "react-i18next";

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
  // Simuleret frontend-fejl
  //throw new Error("Simuleret frontend-fejl");

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarDates, setCalendarDates] = useState([]);

  const { t } = useTranslation();
  const days = t("calendarDays", { returnObjects: true });
  const [isExpanded, setIsExpanded] = useState(false);

  const [weekNumber, setWeekNumber] = useState(getWeekNumber(today));

  const [eventsByDate, setEventsByDate] = useState({});
  const [loadError, setLoadError] = useState(null);


  function getWeekNumber(date) {
    const copiedDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dayNum = copiedDate.getUTCDay() || 7;
    copiedDate.setUTCDate(copiedDate.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(copiedDate.getUTCFullYear(), 0, 1));
    const weekNum = Math.ceil(((copiedDate - yearStart) / 86400000 + 1) / 7);
    return weekNum;
  }

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
    return (
      viewingDate >= getOneYearBefore() && viewingDate <= getOneYearAfter()
    );
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
    setWeekNumber(getWeekNumber(new Date(newYear, newMonth, 1)));
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
    const fullDate = new Date(currentYear, currentMonth, date.day);
    setWeekNumber(getWeekNumber(fullDate));

    if (selectedDate?.day === date.day) {
      setIsExpanded(!isExpanded);
    } else {
      setSelectedDate(date);
      setIsExpanded(true);
    }
  };

  useEffect(() => {
  fetch("http://localhost:9999/api/events")
    .then(res => {
      // Simuleret backend-fejl
      //throw new Error("Simuleret backend-fejl");
      
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then(events => {
      
      const grouped = events.reduce((acc, ev) => {
        const d = new Date(ev.startTime);
        const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const durationMin = Math.round(ev.duration / 60);
        // lav en “YYYY-MM-DD” nøgle:
        const year  = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day   = String(d.getDate()).padStart(2, "0");
        const dateKey = `${year}-${month}-${day}`;

        // hvis nøglen ikke findes, opret en ny array:
        acc[dateKey] = acc[dateKey] || [];
        acc[dateKey].push({ time, title: ev.name, duration: durationMin });

        return acc;
      }, {});
      setEventsByDate(grouped);
    })
    .catch(err => {
      console.error("Kunne ikke hente events:", err);
      setLoadError(err.message);
    });
}, []);



  const selectedDay = selectedDate?.day;
  //const events = selectedDay ? mockEvents[selectedDay] || [] : [];

  //Her er den opdaterede kode, der bruger eventsByDate i stedet for mockEvents:
  const selectedKey = selectedDay? `${currentYear}-${String(currentMonth+1).padStart(2,"0")}-${String(selectedDay).padStart(2,"0")}`: null;
  const events = selectedKey ? eventsByDate[selectedKey] || [] : [];



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
          <div className="calendar-week">uge {weekNumber}</div>
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

          //const hasEvent = isCurrentMonth && mockEvents[day];

          // Her er den opdaterede kode, der bruger eventsByDate i stedet for mockEvents:
          const key      = `${currentYear}-${String(currentMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
          const hasEvent = isCurrentMonth && eventsByDate[key]?.length > 0;

          
          
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
                <span className="event-duration">({event.duration} min)</span>
              </div>
            ))
          : isExpanded && (
              <div className="event-item no-events">
                {t("calendarNoEvents")}
              </div>
            )}
      </div>
    </div>
  );
};

export default CalenderVisual;
