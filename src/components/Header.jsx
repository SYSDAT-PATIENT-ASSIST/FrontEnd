import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import Logo from "../assets/hospital-region-logo.jpeg";
import QuitIcon from "../assets/exit-icon.webp";
import SettingsIcon from "../assets/settings-icon-2.png";
import AdminButton from "./auth/AdminButton";
import "../styles/Header.css";

function Header() {
  const { t } = useTranslation();

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000); // Opdater hvert minut

    return () => clearInterval(interval);
  }, []);

  const weekdays = [
    t("weekdaySunday"),
    t("weekdayMonday"),
    t("weekdayTuesday"),
    t("weekdayWednesday"),
    t("weekdayThursday"),
    t("weekdayFriday"),
    t("weekdaySaturday"),
  ];
  const dayName = weekdays[now.getDay()];
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  return (
    <>
      <div className="header__panel">
        <div className="header__panel-left">
          <Link to="/" className="header__panel-left-logo">
            <img src={Logo} className="logo" alt="Logo" />
            <h1>{t("headerHospitalName")}</h1>
          </Link>

          <Link to="/" className="header__panel-left-location">
            <h1>{t("headerLocationCode")}</h1>
            <h2>{t("headerDepartmentName")}</h2>
          </Link>
        </div>

        <div className="header__panel-right">
        <AdminButton />
          <div className="header__panel-right-actions">
            

            <Link to="/" className="header__panel-right-actions-quit">
              <img src={QuitIcon} className="logo" alt={t("quit")} />
            </Link>

            <Link to="/Settings" className="header__panel-right-actions-settings">
              <img src={SettingsIcon} className="logo" alt={t("settings")} />
            </Link>
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
