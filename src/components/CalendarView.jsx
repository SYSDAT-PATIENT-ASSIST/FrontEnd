import React from "react";
import { format } from "date-fns";

export default function CalendarView({ selectedDate, activeDishes }) {
  const dateKey = format(selectedDate, "yyyy-MM-dd");

  console.log("CalendarView - activeDishes for dateKey:", dateKey, activeDishes);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Calendar for {dateKey}</h2>
      <div className="border p-4">
        <h3 className="text-lg font-semibold mb-2">Active Dishes:</h3>
        <ul>
          {activeDishes[dateKey]
            ? Object.keys(activeDishes[dateKey]).map((dishId) => {
                const dish = activeDishes[dateKey][dishId];
                return (
                  <li key={dishId}>
                    {dish.active ? `Dish ID: ${dishId} is active` : `Dish ID: ${dishId} is not active`}
                  </li>
                );
              })
            : "No dishes selected for this date."}
        </ul>
      </div>
    </div>
  );
}
