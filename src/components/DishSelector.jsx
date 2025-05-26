import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

export default function DishSelector({ selectedDate }) {
  const { t } = useTranslation();
  const [dishes, setDishes] = useState([]);
  const [activeDishes, setActiveDishes] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Brug dish keys frem for hardcoded navne
    setDishes([
      { id: 1, key: "grilledSalmon" },
      { id: 2, key: "pumpkinSoup" },
      { id: 3, key: "roastDuck" },
      { id: 4, key: "vegetableStirFry" },
      { id: 5, key: "beefStroganoff" },
      { id: 6, key: "chickenCurry" },
      { id: 7, key: "pastaPrimavera" },
      { id: 8, key: "caesarSalad" }
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
            active: !currentStatus
          }
        }
      };
    });
  };

  const dateKey = format(selectedDate, "yyyy-MM-dd");

  // Filtrér baseret på oversat navn
  const filteredDishes = dishes.filter((dish) =>
    t(`dishes.${dish.key}`).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="team-e__dish-selector">
      <h2 className="team-e__subtitle">{t("dishesForDate", { dateKey })}</h2>

      <div className="team-e__search-dishes">
        <input
          type="text"
          placeholder={t("searchDishPlaceholder")}
          className="team-e__search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredDishes.map((dish) => {
        const isActive = activeDishes[dateKey]?.[dish.id]?.active;
        return (
          <div key={dish.id} className="team-e__dish">
            <span>{t(`dishes.${dish.key}`)}</span>
            <button
              className={`team-e__toggle-button ${isActive ? "active" : "inactive"}`}
              onClick={() => toggleDish(dish.id)}
            >
              {isActive ? t("deactivateButton") : t("activateButton")}
            </button>
          </div>
        );
      })}
    </div>
  );
}
