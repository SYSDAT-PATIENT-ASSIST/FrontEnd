import React, { useState } from "react";
import CalendarView from "../components/CalendarView";
import DishSelector from "../components/DishSelector";
import ActiveDishes from "../components/ActiveDishes";
import { useTranslation } from "react-i18next";
import "../styles/DishCalenderPage.css";

export default function DishCalendarPage() {
  // Default to today's date
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeDishes, setActiveDishes] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  // Når en dato vælges i kalenderen, vis popup
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowPopup(true);
  };

  return (
    <div className="team-e__dish-calendar-page">
      <h1 className="team-e__title">Dish Calendar Manager</h1>

      <div className="team-e__calendar-grid">
        {/* Retter vises nu altid fordi selectedDate altid har en værdi */}
        <DishSelector
          selectedDate={selectedDate}
          activeDishes={activeDishes}
          setActiveDishes={setActiveDishes}
        />

        <CalendarView
          selectedDate={selectedDate}
          setSelectedDate={handleDateSelect}
          activeDishes={activeDishes}
          setActiveDishes={setActiveDishes}
        />
      </div>

      {/* Popup vises kun hvis aktivt valgt */}
      {showPopup && selectedDate && (
        <div className="team-e__popup">
          <ActiveDishes
            selectedDate={selectedDate}
            activeDishes={activeDishes}
            setActiveDishes={setActiveDishes}
          />

          <button
            className="team-e__deactivate-button"
            onClick={() => setShowPopup(false)}
          >
            Luk vindue
          </button>
        </div>
      )}
    </div>
  );
}
