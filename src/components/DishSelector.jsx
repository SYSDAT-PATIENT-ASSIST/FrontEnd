import React, { useEffect, useState } from "react";
import { format } from "date-fns";

export default function DishSelector({ selectedDate, activeDishes, onDishSelection }) {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    // Simulate fetching dishes from back end
    setDishes([
      { id: 1, name: "Grilled Salmon" },
      { id: 2, name: "Pumpkin Soup" },
      { id: 3, name: "Roast Duck" },
    ]);
  }, []);

  console.log("DishSelector - selectedDate:", selectedDate);
  console.log("DishSelector - activeDishes:", activeDishes);

  const toggleDish = (dishId) => {
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    const isActive = !activeDishes[dateKey]?.[dishId]?.active;
    onDishSelection(dishId, dateKey, isActive);
  };

  const dateKey = format(selectedDate, "yyyy-MM-dd");

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Dishes for {dateKey}</h2>
      {dishes.map((dish) => {
        const isActive = activeDishes[dateKey]?.[dish.id]?.active || false;
        return (
          <div key={dish.id} className="flex justify-between items-center mb-2 p-2 border rounded">
            <span>{dish.name}</span>
            <button
              className={`px-4 py-1 rounded text-white ${isActive ? "bg-red-500" : "bg-green-500"}`}
              onClick={() => toggleDish(dish.id)}
            >
              {isActive ? "Deaktivér" : "Aktivér"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
