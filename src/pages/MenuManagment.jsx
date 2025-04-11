import { useState } from 'react';
import { NavLink, Link } from 'react-router';
import {
  ChevronUp,
  PlusCircle,
  Search,
  Eye,
  Edit,
  Trash2,
  X,
  Check,
} from 'lucide-react';
import '../styles/MenuManagement.css';

function MenuManagement() {
  // State for storing menu items
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      title: 'Kylling med kartofler og grøntsager',
      description:
        'Saftig kyllingefilet serveret med kartofler og sæsonens grøntsager',
      lastUsed: '15.04.2025',
      nutrition: {
        calories: 380,
        protein: 25,
        carbs: 40,
        fat: 12,
      },
      allergens: ['Gluten'],
      recipe: [
        'Steg kyllingen ved medium varme i 6-8 minutter på hver side',
        'Kog kartoflerne i letsaltet vand i 15-20 minutter',
        'Damp grøntsagerne i 5-7 minutter',
        'Server det hele sammen med en lille klat smør på kartoflerne',
      ],
    },
    {
      id: 2,
      title: 'Laksefrikadeller med dildkartofler',
      description:
        'Hjemmelavede laksefrikadeller serveret med dildkartofler og citron',
      lastUsed: '20.04.2025',
      nutrition: {
        calories: 420,
        protein: 28,
        carbs: 35,
        fat: 18,
      },
      allergens: ['Fisk', 'Æg'],
      recipe: [
        'Bland hakket laks med løg, æg og rasp',
        'Form frikadeller og steg dem på panden',
        'Kog kartoflerne og vend dem med frisk dild',
        'Server med en skive citron',
      ],
    },
    {
      id: 3,
      title: 'Vegetarisk pasta med tomatsauce',
      description:
        'Frisk pasta med hjemmelavet tomatsauce og sæsonens grøntsager',
      lastUsed: '12.04.2025',
      nutrition: {
        calories: 350,
        protein: 12,
        carbs: 65,
        fat: 8,
      },
      allergens: ['Gluten'],
      recipe: [
        'Kog pastaen i letsaltet vand',
        'Steg løg og hvidløg i olivenolie',
        'Tilsæt hakkede tomater og krydderier',
        'Lad saucen simre i 20 minutter',
        'Bland pastaen med saucen og server',
      ],
    },
  ]);

  // State for modal and current item
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add', 'edit', 'delete', 'view'
  const [currentItem, setCurrentItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    allergens: '',
    recipe: '',
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      allergens: '',
      recipe: '',
    });
    setErrors({});
  };

  // Open modal for adding new item
  const handleAddClick = () => {
    resetForm();
    setModalType('add');
    setShowModal(true);
  };

  // Open modal for editing existing item
  const handleEditClick = (item) => {
    setCurrentItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      calories: item.nutrition.calories,
      protein: item.nutrition.protein,
      carbs: item.nutrition.carbs,
      fat: item.nutrition.fat,
      allergens: item.allergens.join(', '),
      recipe: item.recipe.join('\n'),
    });
    setModalType('edit');
    setShowModal(true);
  };

  // Open confirmation modal for deleting item
  const handleDeleteClick = (item) => {
    setCurrentItem(item);
    setModalType('delete');
    setShowModal(true);
  };

  // Open view modal to see recipe details
  const handleViewClick = (item) => {
    setCurrentItem(item);
    setModalType('view');
    setShowModal(true);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Titel er påkrævet';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save form data
  const handleSave = () => {
    if (!validateForm()) return;

    // Process allergens string to array
    const allergensArray = formData.allergens
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '');

    // Process recipe string to array
    const recipeArray = formData.recipe
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item !== '');

    const newItem = {
      id: currentItem ? currentItem.id : Date.now(),
      title: formData.title,
      description: formData.description,
      lastUsed: new Date().toLocaleDateString('da-DK'),
      nutrition: {
        calories: parseInt(formData.calories) || 0,
        protein: parseInt(formData.protein) || 0,
        carbs: parseInt(formData.carbs) || 0,
        fat: parseInt(formData.fat) || 0,
      },
      allergens: allergensArray,
      recipe: recipeArray,
    };

    if (modalType === 'add') {
      setMenuItems([...menuItems, newItem]);
      alert('Retten er blevet tilføjet.');
    } else if (modalType === 'edit') {
      setMenuItems(
        menuItems.map((item) => (item.id === currentItem.id ? newItem : item))
      );
      alert('Ændringer er gemt.');
    }

    setShowModal(false);
    resetForm();
  };

  // Delete item
  const handleDelete = () => {
    setMenuItems(menuItems.filter((item) => item.id !== currentItem.id));
    alert('Retten er blevet fjernet.');
    setShowModal(false);
  };

  // Filter menu items based on search query
  const filteredItems = menuItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className='menu-container'>
        <div className='menu-header'>
          <h1>Menu Administration</h1>
          <button onClick={handleAddClick} className='plan-menu-button'>
            <PlusCircle className='icon' />
            Planlæg menu
          </button>
        </div>

        <div className='menu-content'>
          <div className='menu-actions'>
            <h2>Retter</h2>
            <button onClick={handleAddClick} className='add-dish-button'>
              <PlusCircle className='icon' />
              Tilføj ny ret
            </button>
          </div>

          <div className='search-container'>
            <div className='search-icon-wrapper'>
              <Search className='search-icon' />
            </div>
            <input
              type='text'
              placeholder='Søg efter retter...'
              className='search-input'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <table className='menu-table'>
            <thead>
              <tr>
                <th>
                  <div className='flex items-center'>
                    Titel
                    <ChevronUp className='sort-icon' />
                  </div>
                </th>
                <th>Beskrivelse</th>
                <th>Sidst anvendt</th>
                <th className='text-right'>Handlinger</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className='menu-table-row'>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.lastUsed}</td>
                  <td className='actions-cell'>
                    <button
                      onClick={() => handleViewClick(item)}
                      className='view-button'
                      title='Se detaljer'
                    >
                      <Eye className='action-icon' />
                    </button>
                    <button
                      onClick={() => handleEditClick(item)}
                      className='edit-button'
                      title='Rediger'
                    >
                      <Edit className='action-icon' />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item)}
                      className='delete-button'
                      title='Slet'
                    >
                      <Trash2 className='action-icon' />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan='4' className='no-results'>
                    Ingen retter fundet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className='modal-overlay'>
          <div className='modal-container'>
            {/* Modal header */}
            <div className='modal-header'>
              <h3 className='modal-title'>
                {modalType === 'add' && 'Tilføj ny ret'}
                {modalType === 'edit' && 'Rediger ret'}
                {modalType === 'delete' &&
                  'Er du sikker på, at du vil fjerne denne ret?'}
                {modalType === 'view' && currentItem?.title}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className='close-button'
              >
                <X className='close-icon' />
              </button>
            </div>

            {/* Modal body */}
            <div className='modal-body'>
              {modalType === 'delete' && (
                <div className='delete-confirmation'>
                  <p>
                    Du er ved at fjerne {currentItem?.title} fra menuen. Denne
                    handling kan ikke fortrydes.
                  </p>
                  <div className='modal-actions'>
                    <button
                      onClick={() => setShowModal(false)}
                      className='cancel-button'
                    >
                      Annuller
                    </button>
                    <button
                      onClick={handleDelete}
                      className='confirm-delete-button'
                    >
                      Ja, fjern
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'view' && currentItem && (
                <div className='dish-details'>
                  <p className='dish-description'>{currentItem.description}</p>

                  <div className='nutrition-info'>
                    <h4>Ernæringsinfo</h4>
                    <div className='nutrition-grid'>
                      <div className='nutrition-item'>
                        <p className='nutrition-label'>Kalorier</p>
                        <p className='nutrition-value'>
                          {currentItem.nutrition.calories} kcal
                        </p>
                      </div>
                      <div className='nutrition-item'>
                        <p className='nutrition-label'>Protein</p>
                        <p className='nutrition-value'>
                          {currentItem.nutrition.protein} g
                        </p>
                      </div>
                      <div className='nutrition-item'>
                        <p className='nutrition-label'>Kulhydrater</p>
                        <p className='nutrition-value'>
                          {currentItem.nutrition.carbs} g
                        </p>
                      </div>
                      <div className='nutrition-item'>
                        <p className='nutrition-label'>Fedt</p>
                        <p className='nutrition-value'>
                          {currentItem.nutrition.fat} g
                        </p>
                      </div>
                    </div>

                    <h5 className='allergens-title'>Allergener</h5>
                    <div className='allergens-list'>
                      {currentItem.allergens.map((allergen, index) => (
                        <span key={index} className='allergen-tag'>
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className='recipe-section'>
                    <h4>Opskrift</h4>
                    <ol className='recipe-steps'>
                      {currentItem.recipe.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}

              {(modalType === 'add' || modalType === 'edit') && (
                <form className='dish-form'>
                  <div className='form-group'>
                    <label htmlFor='title'>
                      Titel <span className='required'>*</span>
                    </label>
                    <input
                      type='text'
                      id='title'
                      name='title'
                      value={formData.title}
                      onChange={handleInputChange}
                      className={errors.title ? 'input-error' : ''}
                      placeholder='F.eks. Kylling med kartofler'
                    />
                    {errors.title && (
                      <p className='error-message'>{errors.title}</p>
                    )}
                    <div className='character-count'>
                      {formData.title.length}/50 tegn
                    </div>
                  </div>

                  <div className='form-group'>
                    <label htmlFor='description'>Beskrivelse</label>
                    <textarea
                      id='description'
                      name='description'
                      value={formData.description}
                      onChange={handleInputChange}
                      rows='4'
                      placeholder='Beskriv retten...'
                    ></textarea>
                    <div className='character-count'>
                      {formData.description.length}/500 tegn
                    </div>
                  </div>

                  <div className='form-group'>
                    <h4>Ernæringsinfo</h4>
                    <div className='nutrition-form-grid'>
                      <div>
                        <label htmlFor='calories'>Kalorier (kcal)</label>
                        <input
                          type='number'
                          id='calories'
                          name='calories'
                          value={formData.calories}
                          onChange={handleInputChange}
                          placeholder='F.eks. 350'
                        />
                      </div>
                      <div>
                        <label htmlFor='protein'>Protein (g)</label>
                        <input
                          type='number'
                          id='protein'
                          name='protein'
                          value={formData.protein}
                          onChange={handleInputChange}
                          placeholder='F.eks. 25'
                        />
                      </div>
                      <div>
                        <label htmlFor='carbs'>Kulhydrater (g)</label>
                        <input
                          type='number'
                          id='carbs'
                          name='carbs'
                          value={formData.carbs}
                          onChange={handleInputChange}
                          placeholder='F.eks. 40'
                        />
                      </div>
                      <div>
                        <label htmlFor='fat'>Fedt (g)</label>
                        <input
                          type='number'
                          id='fat'
                          name='fat'
                          value={formData.fat}
                          onChange={handleInputChange}
                          placeholder='F.eks. 12'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='form-group'>
                    <label htmlFor='allergens'>
                      Allergener (adskilt med komma)
                    </label>
                    <input
                      type='text'
                      id='allergens'
                      name='allergens'
                      value={formData.allergens}
                      onChange={handleInputChange}
                      placeholder='F.eks.: Gluten, Mælk, Nødder'
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='recipe'>Opskrift</label>
                    <textarea
                      id='recipe'
                      name='recipe'
                      value={formData.recipe}
                      onChange={handleInputChange}
                      rows='6'
                      placeholder='Beskriv tilberedning, portionsstørrelse og ingredienser...'
                    ></textarea>
                    <p className='help-text'>Skriv hvert trin på en ny linje</p>
                  </div>

                  <div className='form-actions'>
                    <button
                      type='button'
                      onClick={() => setShowModal(false)}
                      className='cancel-button'
                    >
                      Annuller
                    </button>
                    <button
                      type='button'
                      onClick={handleSave}
                      className='save-button'
                    >
                      <Check className='save-icon' />
                      Gem
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MenuManagement;
