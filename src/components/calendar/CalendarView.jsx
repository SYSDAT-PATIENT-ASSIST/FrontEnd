import { useState } from 'react'
import { NavLink, Link } from "react-router"
import Logo from '../../assets/CapitalHTransBG.png'
import Arrow from '../../assets/left_arrow.png'
import '../../styles/calendar/CalendarView.css'
import CalenderVisual from './CalenderVisual.jsx'
import CalendarErrorBoundary from './CalendarError.jsx'

function CalendarView() {
  return (
    <>    

      <div className="calendar-view__content">
        <h1>LANDING PAGE</h1>
        <CalendarErrorBoundary componentFailed="Kalenderen">
          <CalenderVisual />
        </CalendarErrorBoundary>
        <h1>STUFF GOES HERE</h1>
      </div>
    </>
  )
}

export default CalendarView


