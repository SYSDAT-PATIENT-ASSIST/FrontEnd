// src/components/menu/MenuModal.jsx
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
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
  const dialogRef = useRef(null);

  useEffect(() => {
    if (show) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [show]);

  // Handle clicks outside the dialog content
  const handleBackdropClick = (e) => {
    const dialogDimensions = dialogRef.current.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className='rounded-lg shadow-lg max-w-3xl w-full p-0 bg-white text-gray-800'
      onClick={handleBackdropClick}
    >
      {/* Modal header */}
      <div className='flex justify-between items-center p-4 border-b'>
        <h3 className='text-xl font-bold text-gray-800'>
          {type === 'add' && 'Tilføj ny ret'}
          {type === 'edit' && 'Rediger ret'}
          {type === 'delete' && 'Er du sikker på, at du vil fjerne denne ret?'}
          {type === 'view' && item?.title}
        </h3>
        <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
          <X className='h-6 w-6' />
        </button>
      </div>

      {/* Modal body */}
      <div className='p-4 text-gray-800 max-h-[70vh] overflow-y-auto'>
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
    </dialog>
  );
};

export default MenuModal;
