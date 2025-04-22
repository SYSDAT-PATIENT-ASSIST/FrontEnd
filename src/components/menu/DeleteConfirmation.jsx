// src/components/menu/DeleteConfirmation.jsx
import React from 'react';

const DeleteConfirmation = ({ item, onCancel, onConfirm }) => {
  return (
    <div className='text-gray-800'>
      <p className='mb-4 text-gray-700'>
        Du er ved at fjerne {item?.title} fra menuen. Denne handling kan ikke
        fortrydes.
      </p>
      <div className='flex justify-end space-x-3 mt-4'>
        <button
          onClick={onCancel}
          className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded'
        >
          Annuller
        </button>
        <button
          onClick={onConfirm}
          className='bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded'
        >
          Ja, fjern
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
