import { useState } from 'react'
import { NavLink, Link } from "react-router"
import Logo from '../assets/hospital-region-logo.jpeg'
import QuitIcon from '../assets/exit-icon.webp'
import SettingsIcon from '../assets/settings-icon-2.png'
import '../styles/Header.css'

function Header() {
  return (
    <>
      <div className="header__panel">

        <div className="header__panel-left">

          <Link to="/" className="header__panel-left-logo">
            <img src={Logo} className="logo" alt="Logo" />
            <h1>Bornholms<br />Hospital</h1>
          </Link>

          <Link to="/" className="header__panel-left-location">
            <h1>202-1</h1>
            <h2>Kirurgisk afdeling</h2>
          </Link>

        </div>

        <div className="header__panel-right">

          <div className="header__panel-right-actions">

            <Link to="/" className="header__panel-right-actions-quit">
              <img src={QuitIcon} className="logo" alt="Quit" />
            </Link>

            <Link to="/" className="header__panel-right-actions-settings">
              <img src={SettingsIcon} className="logo" alt="Settings" />
            </Link>

          </div>

          <Link to="/calendar" className="header__panel-right-date_time">
            <h1>Mandag 10-03</h1>
            <h2>15:00</h2>
          </Link>

        </div>

      </div>
    </>
  )
}

export default Header

