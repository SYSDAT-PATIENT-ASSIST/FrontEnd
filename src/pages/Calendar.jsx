import { useState } from "react";
import { NavLink, Link, Outlet } from "react-router";
import "../styles/calendar/Calendar.css";
import CalendarHeader from "../components/calendar/CalendarHeader.jsx";
import ErrorComponentBoundary from "../components/ErrorComponentBoundary.jsx";

function Calendar() {
  return (
    <>
      <div className="calendar__container">
          <CalendarHeader />
          <ErrorComponentBoundary componentFailed="Kalenderen" onRetry={() => window.location.reload()}>
          <div className="calendar__content">
            <Outlet />
          </div>
        </ErrorComponentBoundary>
      </div>
    </>
  );
}

export default Calendar;
