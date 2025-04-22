import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

const MenuItem = ({ item, onView, onEdit, onDelete }) => {
  return (
    <tr className='border-b hover:bg-gray-50'>
      <td className='px-6 py-4 text-gray-800'>{item.title}</td>
      <td className='px-6 py-4 text-gray-700'>{item.description}</td>
      <td className='px-6 py-4 flex space-x-4 justify-end'>
        <button
          onClick={() => onView(item)}
          className='text-blue-600 hover:text-blue-800'
          title='Se detaljer'
        >
          <Eye className='h-5 w-5' />
        </button>
        <button
          onClick={() => onEdit(item)}
          className='text-gray-600 hover:text-gray-800'
          title='Rediger'
        >
          <Edit className='h-5 w-5' />
        </button>
        <button
          onClick={() => onDelete(item)}
          className='text-red-600 hover:text-red-800'
          title='Slet'
        >
          <Trash2 className='h-5 w-5' />
        </button>
      </td>
    </tr>
  );
};

export default MenuItem;
