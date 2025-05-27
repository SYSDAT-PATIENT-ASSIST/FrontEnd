import { useState } from 'react'
import { NavLink, Link, Outlet } from "react-router"
import '../../styles/calendar/CalendarLanding.css'
import CalendarLogo from '../../assets/calendar_icon_white.png'
import CalendarHeader from './CalendarHeader.jsx'
import { useTranslation } from 'react-i18next'

function CalendarLanding() {
  const { t } = useTranslation();

  return (
    <>
      <div className="calendar-landing__content">
        <img src={CalendarLogo} />
        <Link to="/calendar/view" className="calendar-landing__fancy-link">
          <h1>{t('calendarView')}</h1>
        </Link>
        <ul>
          <li>{t('calendarMonth')}</li>
          <li>{t('calendarWeek')}</li>
          <li>{t('calendarDay')}</li>
          <li>{t('calendarToday')}</li>
        </ul>
        <Link to="/admin" className="calendar-landing__regular-link">
          <h1>{t('calendarAdmin')}</h1>
        </Link>
      </div>
    </>
  )
}

export default CalendarLanding


