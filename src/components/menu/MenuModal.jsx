// src/components/menu/MenuModal.jsx
import React from 'react';
import { X, Check } from 'lucide-react';
import DishForm from './DishForm';
import DishDetails from './DishDetails';
import DeleteConfirmation from './DeleteConfirmation';

const MenuModal = ({
  show,
  type,
  item,
  formData,
  errors,
  onClose,
  onChange,
  onSave,
  onDelete,
}) => {
  if (!show) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-90vh overflow-y-auto'>
        {/* Modal header */}
        <div className='flex justify-between items-center p-4 border-b'>
          <h3 className='text-xl font-bold'>
            {type === 'add' && 'Tilføj ny ret'}
            {type === 'edit' && 'Rediger ret'}
            {type === 'delete' &&
              'Er du sikker på, at du vil fjerne denne ret?'}
            {type === 'view' && item?.title}
          </h3>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'
          >
            <X className='h-6 w-6' />
          </button>
        </div>

        {/* Modal body */}
        <div className='p-4'>
          {type === 'delete' && (
            <DeleteConfirmation
              item={item}
              onCancel={onClose}
              onConfirm={onDelete}
            />
          )}

          {type === 'view' && item && <DishDetails item={item} />}

          {(type === 'add' || type === 'edit') && (
            <DishForm
              formData={formData}
              errors={errors}
              onChange={onChange}
              onSave={onSave}
              onCancel={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
