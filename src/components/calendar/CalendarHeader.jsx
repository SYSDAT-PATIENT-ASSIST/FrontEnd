import { useState } from 'react'
import { NavLink, Link } from "react-router"
import Logo from '../../assets/CapitalHTransBG.png'
import Arrow from '../../assets/left_arrow.png'
import '../../styles/calendar/CalendarHeader.css'
import { useTranslation } from 'react-i18next'

function CalendarHeader() {
  const { t } = useTranslation();

  return (
    <>
      <div className="calendar-header__panel">

        <div className="calendar-header__panel-left">

          <Link to="/" className="calendar-header__panel-left-logo">
            <img src={Logo} alt="Logo" />
          </Link>

          <div className="calendar-header__panel-left-title">
            <h1>Bornholms</h1>
            <h2>Hospital</h2>
          </div>

        </div>

        <div className="calendar-header__panel-right">

          <Link to="/" className="calendar-header__panel-right-back">
            <img src={Arrow} alt="Return" />
            <h1>{t("back")}</h1>
          </Link>

        </div>

      </div>
    </>
  )
}

export default CalendarHeader


