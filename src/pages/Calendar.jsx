import { useState } from 'react'
import { NavLink, Link, Outlet } from "react-router"
import '../styles/Calendar.css'
import CalendarHeader from '../components/CalendarHeader.jsx'

function Calendar() 
{
  return (
    <>
      <div className="calendar__container">
      
          <CalendarHeader />
      
          <div className="calendar__content">
              <h1>ACTUAL CALENDAR</h1>
              <h1>STUFF GOES HERE</h1>
          </div>

      </div>
    </>
  )
}

export default Calendar

