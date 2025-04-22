import React, { useState, useEffect } from 'react';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Link } from 'react-router';
import MenuItem from '../components/menu/MenuItem';
import MenuModal from '../components/menu/MenuModal';
import { initialMenuItems } from '../data/menuItems';
import '../styles/dialog.css';

function MenuManagement() {
  const [menuItems, setMenuItems] = useState([]);
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'view', 'delete'
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    allergens: '',
    ingredients: '',
    recipe: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Load menu items from data file or localStorage if available
    setMenuItems(initialMenuItems);
  }, []);

  const handleAddClick = () => {
    setModalType('add');
    setCurrentItem(null);
    setFormData({
      title: '',
      description: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      allergens: '',
      ingredients: '',
      recipe: '',
    });
    setErrors({});
  };

  const handleViewClick = (item) => {
    setModalType('view');
    setCurrentItem(item);
  };

  const handleEditClick = (item) => {
    setModalType('edit');
    setCurrentItem(item);

    // Set form data from the item, converting arrays to strings for textareas
    setFormData({
      title: item.title,
      description: item.description,
      calories: item.nutrition.calories,
      protein: item.nutrition.protein,
      carbs: item.nutrition.carbs,
      fat: item.nutrition.fat,
      allergens: item.allergens.join(', '),
      ingredients: item.ingredients.join('\n'),
      recipe: item.recipe.join('\n'),
    });

    setErrors({});
  };

  const handleDeleteClick = (item) => {
    setModalType('delete');
    setCurrentItem(item);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setCurrentItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Titel er påkrævet';
    } else if (formData.title.length > 50) {
      newErrors.title = 'Titel må maksimalt være 50 tegn';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Beskrivelse må maksimalt være 500 tegn';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const newItem = {
      id: currentItem ? currentItem.id : Date.now(),
      title: formData.title,
      description: formData.description,
      nutrition: {
        calories: Number(formData.calories) || 0,
        protein: Number(formData.protein) || 0,
        carbs: Number(formData.carbs) || 0,
        fat: Number(formData.fat) || 0,
      },
      allergens: formData.allergens
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      ingredients: formData.ingredients
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      recipe: formData.recipe
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
    };

    if (modalType === 'add') {
      setMenuItems([...menuItems, newItem]);
    } else if (modalType === 'edit') {
      setMenuItems(
        menuItems.map((item) => (item.id === currentItem.id ? newItem : item))
      );
    }

    handleCloseModal();
  };

  const handleDelete = () => {
    if (currentItem) {
      setMenuItems(menuItems.filter((item) => item.id !== currentItem.id));
      handleCloseModal();
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='bg-white rounded-lg shadow p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold text-gray-800'>Menustyring</h1>
          <div className='flex gap-3'>
            <Link
              to='/calendar'
              className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center text-lg'
            >
              <CalendarIcon className='w-6 h-6 mr-2' />
              Kalender
            </Link>
            <button
              onClick={handleAddClick}
              className='bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center text-lg'
            >
              <Plus className='w-6 h-6 mr-2' />
              Tilføj ny ret
            </button>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>
                  Titel
                </th>
                <th className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>
                  Beskrivelse
                </th>
                <th className='px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider'>
                  Handlinger
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {menuItems && menuItems.length > 0 ? (
                menuItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onView={handleViewClick}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan='3'
                    className='px-6 py-4 text-center text-base text-gray-500'
                  >
                    Ingen retter tilføjet endnu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for add/edit/view/delete */}
      <MenuModal
        show={modalType !== null}
        type={modalType}
        item={currentItem}
        formData={formData}
        errors={errors}
        onClose={handleCloseModal}
        onChange={handleInputChange}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default MenuManagement;
