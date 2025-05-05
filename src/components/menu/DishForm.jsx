import React from 'react';
import { Check } from 'lucide-react';

const DishForm = ({ formData, errors, onChange, onSave, onCancel }) => {
  return (
    <form className='text-gray-800'>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-base font-bold mb-2'
          htmlFor='title'
        >
          Titel <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          id='title'
          name='title'
          value={formData.title}
          onChange={onChange}
          className={`border rounded w-full py-2 px-3 text-gray-800 text-base ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder='F.eks. Kylling med kartofler'
        />
        {errors.title && (
          <p className='text-red-500 text-sm mt-1'>{errors.title}</p>
        )}
        <div className='text-sm text-gray-500 mt-1'>
          {formData.title.length}/50 tegn
        </div>
      </div>

      <div className='mb-4'>
        <label
          className='block text-gray-700 text-base font-bold mb-2'
          htmlFor='description'
        >
          Beskrivelse <span className='text-red-500'>*</span>
        </label>
        <textarea
          id='description'
          name='description'
          value={formData.description}
          onChange={onChange}
          className={`border rounded w-full py-2 px-3 text-gray-800 text-base ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          rows='4'
          placeholder='Beskriv retten...'
        ></textarea>
        {errors.description && (
          <p className='text-red-500 text-sm mt-1'>{errors.description}</p>
        )}
        <div className='text-sm text-gray-500 mt-1'>
          {formData.description.length}/500 tegn
        </div>
      </div>

      <div className='mb-4'>
        <h4 className='text-xl font-semibold mb-2 text-gray-800'>
          Ernæringsinfo
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label
              className='block text-gray-700 text-base font-bold mb-2'
              htmlFor='calories'
            >
              Kalorier (kcal) <span className='text-red-500'>*</span>
            </label>
            <input
              type='number'
              id='calories'
              name='calories'
              value={formData.calories}
              onChange={onChange}
              className={`border rounded w-full py-2 px-3 text-gray-800 text-base ${
                errors.calories ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder='F.eks. 350'
            />
            {errors.calories && (
              <p className='text-red-500 text-sm mt-1'>{errors.calories}</p>
            )}
          </div>
          <div>
            <label
              className='block text-gray-700 text-base font-bold mb-2'
              htmlFor='protein'
            >
              Protein (g) <span className='text-red-500'>*</span>
            </label>
            <input
              type='number'
              id='protein'
              name='protein'
              value={formData.protein}
              onChange={onChange}
              className={`border rounded w-full py-2 px-3 text-gray-800 text-base ${
                errors.protein ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder='F.eks. 25'
            />
            {errors.protein && (
              <p className='text-red-500 text-sm mt-1'>{errors.protein}</p>
            )}
          </div>
          <div>
            <label
              className='block text-gray-700 text-base font-bold mb-2'
              htmlFor='carbs'
            >
              Kulhydrater (g) <span className='text-red-500'>*</span>
            </label>
            <input
              type='number'
              id='carbs'
              name='carbs'
              value={formData.carbs}
              onChange={onChange}
              className={`border rounded w-full py-2 px-3 text-gray-800 text-base ${
                errors.carbs ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder='F.eks. 40'
            />
            {errors.carbs && (
              <p className='text-red-500 text-sm mt-1'>{errors.carbs}</p>
            )}
          </div>
          <div>
            <label
              className='block text-gray-700 text-base font-bold mb-2'
              htmlFor='fat'
            >
              Fedt (g) <span className='text-red-500'>*</span>
            </label>
            <input
              type='number'
              id='fat'
              name='fat'
              value={formData.fat}
              onChange={onChange}
              className={`border rounded w-full py-2 px-3 text-gray-800 text-base ${
                errors.fat ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder='F.eks. 12'
            />
            {errors.fat && (
              <p className='text-red-500 text-sm mt-1'>{errors.fat}</p>
            )}
          </div>
        </div>
      </div>

      <div className='mb-4'>
        <label
          className='block text-gray-700 text-base font-bold mb-2'
          htmlFor='allergens'
        >
          Allergener (adskilt med komma) <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          id='allergens'
          name='allergens'
          value={formData.allergens}
          onChange={onChange}
          className={`border rounded w-full py-2 px-3 text-gray-800 text-base ${
            errors.allergens ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder='F.eks.: Gluten, Mælk, Nødder'
        />
        {errors.allergens && (
          <p className='text-red-500 text-sm mt-1'>{errors.allergens}</p>
        )}
      </div>

      <div className='mb-4'>
        <label
          className='block text-gray-700 text-base font-bold mb-2'
          htmlFor='ingredients'
        >
          Ingredienser <span className='text-red-500'>*</span>
        </label>
        <textarea
          id='ingredients'
          name='ingredients'
          value={formData.ingredients}
          onChange={onChange}
          className={`border rounded w-full py-2 px-3 text-gray-800 text-base ${
            errors.ingredients ? 'border-red-500' : 'border-gray-300'
          }`}
          rows='4'
          placeholder='Skriv hver ingrediens på en ny linje'
        ></textarea>
        {errors.ingredients && (
          <p className='text-red-500 text-sm mt-1'>{errors.ingredients}</p>
        )}
        <p className='text-sm text-gray-500 mt-1'>
          Skriv hver ingrediens på en ny linje
        </p>
      </div>

      <div className='mb-4'>
        <label
          className='block text-gray-700 text-base font-bold mb-2'
          htmlFor='recipe'
        >
          Opskrift <span className='text-red-500'>*</span>
        </label>
        <textarea
          id='recipe'
          name='recipe'
          value={formData.recipe}
          onChange={onChange}
          className={`border rounded w-full py-2 px-3 text-gray-800 text-base ${
            errors.recipe ? 'border-red-500' : 'border-gray-300'
          }`}
          rows='6'
          placeholder='Skriv hvert trin på en ny linje'
        ></textarea>
        {errors.recipe && (
          <p className='text-red-500 text-sm mt-1'>{errors.recipe}</p>
        )}
        <p className='text-sm text-gray-500 mt-1'>
          Skriv hvert trin på en ny linje
        </p>
      </div>

      <div className='flex justify-end space-x-3 mt-6'>
        <button
          type='button'
          onClick={onCancel}
          className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded text-base'
        >
          Annuller
        </button>
        <button
          type='button'
          onClick={onSave}
          className='bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center text-base'
        >
          <Check className='w-6 h-6 mr-2' />
          Gem
        </button>
      </div>

      <div className='mt-4 text-sm text-gray-600'>
        <span className='text-red-500'>*</span> Alle felter er påkrævede
      </div>
    </form>
  );
};

export default DishForm;
