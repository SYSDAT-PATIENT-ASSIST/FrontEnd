// src/components/ui/Toast.jsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Toast = ({ message, type, visible, onClose }) => {
  // Automatically close the toast after 3 seconds
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  const bgColor =
    type === 'success'
      ? 'bg-green-100 border-green-500'
      : type === 'error'
      ? 'bg-red-100 border-red-500'
      : 'bg-blue-100 border-blue-500';

  const textColor =
    type === 'success'
      ? 'text-green-800'
      : type === 'error'
      ? 'text-red-800'
      : 'text-blue-800';

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center p-4 mb-4 border-l-4 rounded-md shadow-md ${bgColor} ${textColor}`}
      role='alert'
    >
      <div className='text-base font-medium mr-3'>{message}</div>
      <button
        onClick={onClose}
        className='ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8 hover:bg-gray-200'
      >
        <X className='w-5 h-5' />
      </button>
    </div>
  );
};

export default Toast;
