import { useState, useEffect } from "react";
import { Link } from "react-router";
import Logo from "../assets/hospital-region-logo.jpeg";
import QuitIcon from "../assets/exit-icon.webp";
import SettingsIcon from "../assets/settings-icon-2.png";
import AdminButton from "./auth/AdminButton";
import "../styles/Header.css";

function Header() {
    const [now, setNow] = useState(new Date());

  

   useEffect(() => {
      const interval = setInterval(() => {
        const current = new Date();
        setNow(current);

        const hours = current.getHours();
        const minutes = current.getMinutes();

        
        if (hours === 14 && minutes === 0) {
          setShowReminder(true);
        }
      }, 60000); 

      return () => clearInterval(interval);
    }, []);

  const weekdays = [
    "Søndag",
    "Mandag",
    "Tirsdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lørdag",
  ];
  const dayName = weekdays[now.getDay()];
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const [showReminder, setShowReminder] = useState(false);


  return (
    <>
      <div className="header__panel">
        <div className="header__panel-left">
          <Link to="/" className="header__panel-left-logo">
            <img src={Logo} className="logo" alt="Logo" />
            <h1>
              Bornholms
              <br />
              Hospital
            </h1>
          </Link>

          <Link to="/" className="header__panel-left-location">
            <h1>202-1</h1>
            <h2>Kirurgisk afdeling</h2>
          </Link>
        </div>

        <div className="header__reminder-dropdown">

          <button
            className="reminder-button"
            onClick={() => setShowReminder(!showReminder)}
          >
            💬 Meddelser
          </button>
          {showReminder && (
            <div className="reminder-message">
              🕑 Husk at bestille mad inden kl. <strong>14:00</strong>!
            </div>
          )}
        </div>


        <div className="header__panel-right">
          <div className="header__panel-right-actions">
            <div className="flex gap-2 h-full">
              <AdminButton />

              <div className="header__panel-right-actions">
                <Link to="/" className="header__panel-right-actions-quit">
                  <img src={QuitIcon} className="logo" alt="Quit" />
                </Link>

                <Link to="/" className="header__panel-right-actions-settings">
                  <img src={SettingsIcon} className="logo" alt="Settings" />
                </Link>
              </div>
            </div>
          </div>

          <Link to="/calendar" className="header__clock">
            <div className="header__clock-date">
              {dayName} {day}-{month}-{year}
            </div>
            <div className="header__clock-time">
              {hours}:{minutes}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
export default Header;
