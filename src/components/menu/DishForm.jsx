// src/components/menu/DishForm.jsx
import React from 'react';
import { Check } from 'lucide-react';

const DishForm = ({ formData, errors, onChange, onSave, onCancel }) => {
  return (
    <form>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
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
          className={`border rounded w-full py-2 px-3 ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder='F.eks. Kylling med kartofler'
        />
        {errors.title && (
          <p className='text-red-500 text-xs mt-1'>{errors.title}</p>
        )}
        <div className='text-xs text-gray-500 mt-1'>
          {formData.title.length}/50 tegn
        </div>
      </div>

      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='description'
        >
          Beskrivelse
        </label>
        <textarea
          id='description'
          name='description'
          value={formData.description}
          onChange={onChange}
          className='border rounded w-full py-2 px-3 border-gray-300'
          rows='4'
          placeholder='Beskriv retten...'
        ></textarea>
        <div className='text-xs text-gray-500 mt-1'>
          {formData.description.length}/500 tegn
        </div>
      </div>

      <div className='mb-4'>
        <h4 className='text-lg font-semibold mb-2'>Ernæringsinfo</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='calories'
            >
              Kalorier (kcal)
            </label>
            <input
              type='number'
              id='calories'
              name='calories'
              value={formData.calories}
              onChange={onChange}
              className='border rounded w-full py-2 px-3 border-gray-300'
              placeholder='F.eks. 350'
            />
          </div>
          <div>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='protein'
            >
              Protein (g)
            </label>
            <input
              type='number'
              id='protein'
              name='protein'
              value={formData.protein}
              onChange={onChange}
              className='border rounded w-full py-2 px-3 border-gray-300'
              placeholder='F.eks. 25'
            />
          </div>
          <div>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='carbs'
            >
              Kulhydrater (g)
            </label>
            <input
              type='number'
              id='carbs'
              name='carbs'
              value={formData.carbs}
              onChange={onChange}
              className='border rounded w-full py-2 px-3 border-gray-300'
              placeholder='F.eks. 40'
            />
          </div>
          <div>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='fat'
            >
              Fedt (g)
            </label>
            <input
              type='number'
              id='fat'
              name='fat'
              value={formData.fat}
              onChange={onChange}
              className='border rounded w-full py-2 px-3 border-gray-300'
              placeholder='F.eks. 12'
            />
          </div>
        </div>
      </div>

      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='allergens'
        >
          Allergener (adskilt med komma)
        </label>
        <input
          type='text'
          id='allergens'
          name='allergens'
          value={formData.allergens}
          onChange={onChange}
          className='border rounded w-full py-2 px-3 border-gray-300'
          placeholder='F.eks.: Gluten, Mælk, Nødder'
        />
      </div>

      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='recipe'
        >
          Opskrift
        </label>
        <textarea
          id='recipe'
          name='recipe'
          value={formData.recipe}
          onChange={onChange}
          className='border rounded w-full py-2 px-3 border-gray-300'
          rows='6'
          placeholder='Beskriv tilberedning, portionsstørrelse og ingredienser...'
        ></textarea>
        <p className='text-xs text-gray-500 mt-1'>
          Skriv hvert trin på en ny linje
        </p>
      </div>

      <div className='flex justify-end space-x-3 mt-6'>
        <button
          type='button'
          onClick={onCancel}
          className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded'
        >
          Annuller
        </button>
        <button
          type='button'
          onClick={onSave}
          className='bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center'
        >
          <Check className='w-5 h-5 mr-2' />
          Gem
        </button>
      </div>
    </form>
  );
};

export default DishForm;
