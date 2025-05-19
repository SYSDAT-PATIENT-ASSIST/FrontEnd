import React from "react";
import { format } from "date-fns";

export default function ActiveDishes({ selectedDate, activeDishes, setActiveDishes }) {
  const dateKey = format(selectedDate, "yyyy-MM-dd");

  const activeDishIds = Object.keys(activeDishes[dateKey] || {}).filter(
    (dishId) => activeDishes[dateKey][dishId]?.active
  );

  const deactivateDish = (dishId) => {
    setActiveDishes((prev) => {
      const currentDishes = prev[dateKey] || {};
      const dishToUpdate = currentDishes[dishId];

      if (!dishToUpdate) return prev; // Retten findes ikke

      return {
        ...prev,
        [dateKey]: {
          ...currentDishes,
          [dishId]: {
            ...dishToUpdate,
            active: false,
          },
        },
      };
    });
  };

  return (
    <div className="team-e__active-dishes team-e__popup">
      <h3>Aktive retter den {format(selectedDate, "dd-MM-yyyy")}</h3>
      {activeDishIds.length > 0 ? (
        <ul>
          {activeDishIds.map((dishId) => (
            <li key={dishId} className="team-e__dish">
              <span>{activeDishes[dateKey][dishId].name}</span>
              <button
                className="team-e__deactivate-button"
                onClick={() => deactivateDish(dishId)}
              >
                Deaktiver
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Ingen aktive retter for denne dag.</p>
      )}
    </div>
  );
}
