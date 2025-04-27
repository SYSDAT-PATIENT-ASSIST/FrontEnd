import React, { useEffect, useState } from "react";
import { format } from "date-fns";

export default function DishSelector({ selectedDate }) {
  const [dishes, setDishes] = useState([]);
  const [activeDishes, setActiveDishes] = useState({});

  useEffect(() => {
    setDishes([
      { id: 1, name: "Grilled Salmon" },
      { id: 2, name: "Pumpkin Soup" },
      { id: 3, name: "Roast Duck" },
    ]);
  }, []);

  const toggleDish = (dishId) => {
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    setActiveDishes((prev) => {
      const currentStatus = prev[dateKey]?.[dishId]?.active || false;
      return {
        ...prev,
        [dateKey]: {
          ...prev[dateKey],
          [dishId]: {
            active: !currentStatus,
          },
        },
      };
    });
  };

  const dateKey = format(selectedDate, "yyyy-MM-dd");

  return (
    <div className="dish-selector">
      <h2 className="subtitle">Dishes for {dateKey}</h2>
      {dishes.map((dish) => {
        const isActive = activeDishes[dateKey]?.[dish.id]?.active;
        return (
          <div key={dish.id} className="dish">
            <span>{dish.name}</span>
            <button
              className={`toggle-button ${isActive ? "active" : "inactive"}`}
              onClick={() => toggleDish(dish.id)}
            >
              {isActive ? "Deactivate" : "Activate"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
