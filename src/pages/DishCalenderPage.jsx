import React, { useState } from "react";
import CalendarView from "../components/CalendarView";
import DishSelector from "../components/DishSelector";
import { useTranslation } from "react-i18next";
import "../styles/DishCalenderPage.css";

export default function DishCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { t } = useTranslation();

  return (
    <div className="team-e__dish-calendar-page">
      <h1 className="team-e__title">{t("dishCalendarManagerTitle")}</h1>
      <div className="team-e__calendar-grid">
        <DishSelector selectedDate={selectedDate} />
        <CalendarView selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
    </div>
  );
}
