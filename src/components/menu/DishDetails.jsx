import React from 'react';

const DishDetails = ({ item }) => {
  return (
    <div className='text-gray-800'>
      <p className='mb-4 text-gray-700 text-base'>{item.description}</p>

      <div className='bg-gray-50 p-4 rounded-lg mb-4'>
        <h4 className='font-bold mb-3 text-gray-800 text-xl'>Ernæringsinfo</h4>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div>
            <p className='text-gray-600 text-base'>Kalorier</p>
            <p className='font-medium text-gray-800 text-base'>
              {item.nutrition.calories} kcal
            </p>
          </div>
          <div>
            <p className='text-gray-600 text-base'>Protein</p>
            <p className='font-medium text-gray-800 text-base'>
              {item.nutrition.protein} g
            </p>
          </div>
          <div>
            <p className='text-gray-600 text-base'>Kulhydrater</p>
            <p className='font-medium text-gray-800 text-base'>
              {item.nutrition.carbs} g
            </p>
          </div>
          <div>
            <p className='text-gray-600 text-base'>Fedt</p>
            <p className='font-medium text-gray-800 text-base'>
              {item.nutrition.fat} g
            </p>
          </div>
        </div>

        <h5 className='font-medium mt-4 mb-2 text-gray-800 text-lg'>
          Allergener
        </h5>
        <div className='flex flex-wrap gap-2'>
          {item.allergens.map((allergen, index) => (
            <span
              key={index}
              className='bg-gray-200 px-3 py-1 rounded-full text-base text-gray-700'
            >
              {allergen}
            </span>
          ))}
        </div>
      </div>

      <div className='mb-4'>
        <h4 className='font-bold mb-3 text-gray-800 text-xl'>Ingredienser</h4>
        <ul className='list-disc pl-5 space-y-1 text-gray-700 text-base'>
          {item.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className='mb-4'>
        <h4 className='font-bold mb-3 text-gray-800 text-xl'>Opskrift</h4>
        <ol className='list-decimal pl-5 space-y-2 text-gray-700 text-base'>
          {item.recipe.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default DishDetails;
