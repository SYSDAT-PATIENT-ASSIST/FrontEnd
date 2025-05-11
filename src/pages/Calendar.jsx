import { useState } from "react";
import { NavLink, Link, Outlet } from "react-router";
import "../styles/calendar/Calendar.css";
import CalendarHeader from "../components/calendar/CalendarHeader.jsx";
import CalendarErrorBoundary from "../components/calendar/CalendarErrorBoundary.jsx";

function Calendar() {
  return (
    <>
      <div className="calendar__container">
        <CalendarErrorBoundary componentFailed="Kalenderen">
          <CalendarHeader />
          <div className="calendar__content">
            <Outlet />
          </div>
        </CalendarErrorBoundary>
      </div>
    </>
  );
}

export default Calendar;
