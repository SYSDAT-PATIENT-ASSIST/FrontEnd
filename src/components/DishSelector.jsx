import React, { useEffect, useState } from "react";
import { format } from "date-fns";

export default function DishSelector({ selectedDate, activeDishes, setActiveDishes }) {
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Opret en liste af retter
    setDishes([
      { id: 1, name: "Grilled Salmon" },
      { id: 2, name: "Pumpkin Soup" },
      { id: 3, name: "Roast Duck" },
      { id: 4, name: "Vegetable Stir Fry" },
      { id: 5, name: "Beef Stroganoff" },
      { id: 6, name: "Chicken Curry" },
      { id: 7, name: "Pasta Primavera" },
      { id: 8, name: "Caesar Salad" },
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
            name: dishes.find((dish) => dish.id === dishId).name,
          },
        },
      };
    });
  };

  // Filter dishes based on search term
  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="team-e__dish-selector">
      <h2 className="team-e__subtitle">Dishes for {format(selectedDate, "yyyy-MM-dd")}</h2>

      <div className="team-e__search-dishes">
        <input
          type="text"
          placeholder="Search for a dish..."
          className="team-e__search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Handle input change
        />
      </div>

      <div className="team-e__all-dish-selector">
        {filteredDishes.map((dish) => {
          const isActive = activeDishes[format(selectedDate, "yyyy-MM-dd")]?.[dish.id]?.active;
          return (
            <div key={dish.id} className="team-e__dish">
              <span>{dish.name}</span>
              <button
                className={`team-e__toggle-button ${isActive ? "active" : "inactive"}`}
                onClick={() => toggleDish(dish.id)}
              >
                {isActive ? "Deactivate" : "Activate"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
