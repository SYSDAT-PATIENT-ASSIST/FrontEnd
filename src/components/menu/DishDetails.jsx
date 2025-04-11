// src/components/menu/DishDetails.jsx
import React from 'react';

const DishDetails = ({ item }) => {
  return (
    <div>
      <p className='mb-4'>{item.description}</p>

      <div className='bg-gray-50 p-4 rounded-lg mb-4'>
        <h4 className='font-bold mb-3'>Ernæringsinfo</h4>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div>
            <p className='text-gray-600'>Kalorier</p>
            <p className='font-medium'>{item.nutrition.calories} kcal</p>
          </div>
          <div>
            <p className='text-gray-600'>Protein</p>
            <p className='font-medium'>{item.nutrition.protein} g</p>
          </div>
          <div>
            <p className='text-gray-600'>Kulhydrater</p>
            <p className='font-medium'>{item.nutrition.carbs} g</p>
          </div>
          <div>
            <p className='text-gray-600'>Fedt</p>
            <p className='font-medium'>{item.nutrition.fat} g</p>
          </div>
        </div>

        <h5 className='font-medium mt-4 mb-2'>Allergener</h5>
        <div className='flex flex-wrap gap-2'>
          {item.allergens.map((allergen, index) => (
            <span
              key={index}
              className='bg-gray-200 px-3 py-1 rounded-full text-sm'
            >
              {allergen}
            </span>
          ))}
        </div>
      </div>

      <div className='mb-4'>
        <h4 className='font-bold mb-3'>Opskrift</h4>
        <ol className='list-decimal pl-5 space-y-2'>
          {item.recipe.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default DishDetails;
