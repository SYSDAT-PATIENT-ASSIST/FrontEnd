import { useState } from 'react'
import { NavLink, Link, Outlet } from "react-router"
import '../../styles/calendar/CalendarLanding.css'
import CalendarLogo from '../../assets/calendar_icon_white.png'
import CalendarHeader from './CalendarHeader.jsx'

function CalendarLanding() {
  return (
    <>
      <div className="calendar-landing__content">
        <img src={CalendarLogo} />
        <Link to="/calendar/view" className="calendar-landing__fancy-link">
          <h1>Se kalender</h1>
        </Link>
        <ul>
          <li>maaned</li>
          <li>uge</li>
          <li>dag</li>
          <li>idag</li>
        </ul>
        <Link to="/admin" className="calendar-landing__regular-link">
          <h1>administrer</h1>
        </Link>
      </div>
    </>
  )
}

export default CalendarLanding


