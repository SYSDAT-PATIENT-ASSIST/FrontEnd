import React, { useState } from "react";
import CalendarView from "../components/CalendarView";
import DishSelector from "../components/DishSelector";

export default function DishCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeDishes, setActiveDishes] = useState({});

  const handleDishSelection = (dishId, dateKey, isActive) => {
    console.log("Dish selected - dishId:", dishId, "dateKey:", dateKey, "isActive:", isActive);
    setActiveDishes((prev) => {
      const currentDateDishes = prev[dateKey] || {};
      return {
        ...prev,
        [dateKey]: {
          ...currentDateDishes,
          [dishId]: {
            active: isActive,
          },
        },
      };
    });
  };

  console.log("DishCalendarPage - selectedDate:", selectedDate);
  console.log("DishCalendarPage - activeDishes:", activeDishes);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dish Calendar Manager</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CalendarView selectedDate={selectedDate} activeDishes={activeDishes} />
        <DishSelector
          selectedDate={selectedDate}
          activeDishes={activeDishes}
          onDishSelection={handleDishSelection}
        />
      </div>
    </div>
  );
}
