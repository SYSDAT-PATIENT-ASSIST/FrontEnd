import { useState } from 'react'
import { NavLink, Link, Outlet } from "react-router"
import '../styles/calendar/Calendar.css'
import CalendarHeader from '../components/calendar/CalendarHeader.jsx'

function Calendar() {
  return (
    <>
      <div className="calendar__container">

        <CalendarHeader />

        <div className="calendar__content">
          <Outlet />
        </div>

      </div>
    </>
  )
}

export default Calendar

