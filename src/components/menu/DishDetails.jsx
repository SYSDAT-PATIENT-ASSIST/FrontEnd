import React from 'react';
import DishPlaceholder from '../../assets/Dish_placeholder.jpg';

const DishDetails = ({ item }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-800">
      {/* Left Column: Image, Nutrition, Allergens */}
      <div className="flex flex-col space-y-6">
        {/* Image */}
        <img
          src={DishPlaceholder}
          alt="Billede af retten"
          className="w-full rounded-lg shadow max-h-64 object-cover"
        />

        {/* Nutrition Info */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-lg mb-3">Ernæringsinfo</h3>
          <p><span className="font-semibold">Kalorier:</span> {item.kcal} kcal</p>
          <p><span className="font-semibold">Protein:</span> {item.protein} g</p>
          <p><span className="font-semibold">Kulhydrater:</span> {item.carbohydrates} g</p>
          <p><span className="font-semibold">Fedt:</span> {item.fat} g</p>
        </div>

        {/* Allergens */}
        {item.allergens?.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Allergener</h3>
            <div className="flex flex-wrap gap-2">
              {item.allergens.map((allergen, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700"
                >
                  {allergen}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Title, Description, Ingredients, Recipe */}
      <div>
        <h2 className="text-3xl font-bold mb-2">{item.title || item.name}</h2>
        <p className="mb-6 text-gray-600">{item.description}</p>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Ingredienser</h3>
          <ul className="list-disc pl-5 space-y-1">
            {item.recipe?.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Opskrift</h3>
          <ol className="list-decimal pl-5 space-y-2">
            {item.recipe?.instructions?.split('\n').map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DishDetails;
