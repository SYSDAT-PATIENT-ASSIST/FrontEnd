const data = {
    recipes: [
      {
        id: 101,
        title: "Beef Patty Recipe",
        ingredients: ["Beef", "Onion", "Breadcrumb"],
        dish_id: 101,
        instructions:
          "Mix minced beef with chopped onion and seasonings, form patties, and pan-fry until cooked through."
      },
      {
        id: 106,
        title: "Peanut Butter Sandwich Recipe",
        ingredients: ["Whole-grain bread", "Peanut butter"],
        dish_id: 106,
        instructions: "Spread peanut butter between two slices of bread."
      }
    ],
  
    dishes: [
      {
        id: 101,
        name: "Beef Patty",
        description: "Traditional beef patty with onions.",
        available_from: "2023-01-01",
        available_until: "2023-12-31",
        status: "AVAILABLE",
        carbohydrates: 5.0,
        protein: 20.0,
        fat: 15.0,
        allergens: ["Gluten", "Dairy"],
        recipe_id: 101
      },
      {
        id: 106,
        name: "Peanut Butter Sandwich",
        description: "Whole-grain bread with peanut butter.",
        available_from: "2023-01-01",
        available_until: "2023-12-31",
        status: "AVAILABLE",
        carbohydrates: 30.0,
        protein: 12.0,
        fat: 16.0,
        allergens: ["Peanuts", "Gluten"],
        recipe_id: 106
      }
    ],
  
    orders: [
      { id: "1", bed_id: "202-1", order_time: "2025-05-01T08:00:00", status: "IN_PREPARATION" },
      { id: "2", bed_id: "202-2", order_time: "2025-05-01T08:05:00", status: "IN_PREPARATION" },
      { id: "3", bed_id: "203-1", order_time: "2025-05-01T08:10:00", status: "IN_PREPARATION" },
      { id: "4", bed_id: "204-1", order_time: "2025-05-01T08:15:00", status: "IN_PREPARATION" },
      {
        id: "5",
        bed_id: "205-1",
        order_time: "2025-05-01T08:20:00",
        note: "Peanut allergy",
        status: "IN_PREPARATION"
      },
      {
        id: "6",
        bed_id: "205-2",
        order_time: "2025-05-01T08:25:00",
        note: "Gluten-free",
        status: "IN_PREPARATION"
      }
    ],
  
    order_dish: [
      { order_id: "1", dish_id: 101 },
      { order_id: "2", dish_id: 101 },
      { order_id: "3", dish_id: 106 },
      { order_id: "4", dish_id: 106 },
      { order_id: "5", dish_id: 106 },
      { order_id: "6", dish_id: 101 }
    ]
  };
  
  export default data;
  