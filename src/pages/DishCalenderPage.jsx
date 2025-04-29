import React, { useState } from "react";
import CalendarView from "../components/CalendarView";
import DishSelector from "../components/DishSelector";
import "../styles/DishCalenderPage.css";

export default function DishCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="team-e__dish-calendar-page">
      <h1 className="team-e__title">Dish Calendar Manager</h1>
      <div className="team-e__calendar-grid">
        <DishSelector selectedDate={selectedDate} />
        <CalendarView selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
    </div>
  );
}
