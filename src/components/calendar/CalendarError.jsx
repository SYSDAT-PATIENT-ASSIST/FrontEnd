import React from "react";
import "../../styles/calendar/CalendarError.css"; // lille styling, se nedenfor

export default function CalendarError({componentFailed ,onRetry }) {
  return (
    <div className="calendar-error">
      <p>{componentFailed} kunne ikke indlæses.<br />Prøv igen senere.</p>
      <button onClick={onRetry}>Prøv igen</button>
    </div>
  );
}
