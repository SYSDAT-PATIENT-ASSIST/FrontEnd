import React, { useState } from "react";
import CalendarView from "../components/CalendarView";
import DishSelector from "../components/DishSelector";
import ActiveDishes from "../components/ActiveDishes";
import "../styles/DishCalenderPage.css";

export default function DishCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(null);
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
        {/* Retter vises kun hvis en dato er valgt */}
        {selectedDate && (
          <DishSelector
            selectedDate={selectedDate}
            activeDishes={activeDishes}
            setActiveDishes={setActiveDishes}
          />
        )}
        {/* Kalender – klik på dato viser popup */}
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
