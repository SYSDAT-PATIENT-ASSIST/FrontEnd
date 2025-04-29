import React, { useEffect, useState } from "react";
import { format } from "date-fns";

export default function DishSelector({ selectedDate }) {
  const [dishes, setDishes] = useState([]);
  const [activeDishes, setActiveDishes] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // Add search state

  useEffect(() => {
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
          },
        },
      };
    });
  };

  const dateKey = format(selectedDate, "yyyy-MM-dd");

  // Filter dishes based on search term
  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dish-selector">
      <h2 className="subtitle">Dishes for {dateKey}</h2>

      <div className="search-dishes">
        <input
          type="text"
          placeholder="Search for a dish..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Handle input change
        />
      </div>

      {filteredDishes.map((dish) => {
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
