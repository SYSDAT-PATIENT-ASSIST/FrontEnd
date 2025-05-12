import { Link, useNavigate, useLocation } from "react-router";
import Logo from "../../assets/CapitalHTransBG.png";
import Arrow from "../../assets/left_arrow.png";
import "../../styles/calendar/CalendarHeader.css";

function CalendarHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const parentPath = location.pathname.split("/").slice(0, -1).join("/") || "/";

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
          <button
            onClick={() => navigate(parentPath)}
            className="calendar-header__panel-right-back"
          >
            <img src={Arrow} alt="Return" />
            <h1>Tilbage</h1>
          </button>
        </div>
      </div>
    </>
  );
}

export default CalendarHeader;
