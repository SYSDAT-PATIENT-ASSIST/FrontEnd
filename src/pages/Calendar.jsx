import { useState } from 'react'
import { NavLink, Link, Outlet } from "react-router"
import '../styles/Calendar.css'
import CalendarHeader from '../components/CalendarHeader.jsx'

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

