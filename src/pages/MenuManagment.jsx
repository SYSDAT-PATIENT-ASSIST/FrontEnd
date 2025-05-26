import React, { useState, useEffect } from "react";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { Link } from "react-router";
import MenuItem from "../components/menu/MenuItem";
import MenuModal from "../components/menu/MenuModal";
import Toast from "../components/ui/Toast";
import "../styles/dialog.css";

function MenuManagement() {
  const [menuItems, setMenuItems] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    allergens: [],
    ingredients: "",
    recipe: "",
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:7070/api/dishes", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Fejl ved indlæsning af menu")
      )
      .then(setMenuItems)
      .catch((err) => {
        console.error(err);
        showToast("Kunne ikke hente menuen", "error");
      });
  }, []);

  const handleAddClick = () => {
    setModalType("add");
    setCurrentItem(null);
    setFormData({
      title: "",
      description: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      allergens: [],
      ingredients: "",
      recipe: "",
    });
    setErrors({});
  };

  const handleViewClick = (item) => {
    setModalType("view");
    setCurrentItem(item);
  };

  const handleEditClick = (item) => {
    setModalType("edit");
    setCurrentItem(item);
    setFormData({
      title: item.title || item.name,
      description: item.description,
      calories: item.kcal,
      protein: item.protein,
      carbs: item.carbohydrates,
      fat: item.fat,
      allergens: item.allergens || [],
      ingredients:
        item.recipe?.ingredients?.map((i) => i.name).join("\n") || "",
      recipe: item.recipe?.instructions || "",
    });
    setErrors({});
  };

  const handleDeleteClick = (item) => {
    setModalType("delete");
    setCurrentItem(item);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setCurrentItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Special handling for allergens array
    if (name === "allergens") {
      setFormData((prev) => ({
        ...prev,
        [name]: Array.isArray(value) ? value : [],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Titel er påkrævet";
    if (!formData.description.trim())
      newErrors.description = "Beskrivelse er påkrævet";
    if (!formData.calories || formData.calories <= 0)
      newErrors.calories = "Kalorier er påkrævet";
    if (!formData.protein || formData.protein <= 0)
      newErrors.protein = "Protein er påkrævet";
    if (!formData.carbs || formData.carbs <= 0)
      newErrors.carbs = "Kulhydrater er påkrævet";
    if (!formData.fat || formData.fat <= 0) newErrors.fat = "Fedt er påkrævet";
    if (!Array.isArray(formData.allergens) || formData.allergens.length === 0) {
      newErrors.allergens = "Allergener er påkrævet";
    }
    if (!formData.ingredients.trim())
      newErrors.ingredients = "Ingredienser er påkrævet";
    if (!formData.recipe.trim()) newErrors.recipe = "Opskrift er påkrævet";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    const token = localStorage.getItem("token");
    const id = currentItem?.id;

    const payload = {
      name: formData.title,
      description: formData.description,
      kcal: Number(formData.calories),
      protein: Number(formData.protein),
      carbohydrates: Number(formData.carbs),
      fat: Number(formData.fat),
      status: "TILGÆNGELIG",

      allergens: formData.allergens,
      availableFrom: new Date().toISOString().split("T")[0],
      availableUntil: "2025-12-31",
      recipe: {
        title: formData.title,
        instructions: formData.recipe.trim(),
        ingredients: formData.ingredients
          .split("\n")
          .map((i) => ({ name: i.trim() }))
          .filter((i) => i.name),
      },
    };

    if (modalType === "add") {
      fetch("http://localhost:7070/api/dishes/full", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
        .then((res) =>
          res.ok ? res.json() : Promise.reject("Kunne ikke tilføje ret")
        )
        .then(() =>
          fetch("http://localhost:7070/api/dishes", {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
        .then((res) => res.json())
        .then((data) => {
          setMenuItems(data);
          showToast(`${formData.title} er tilføjet!`);
          setTimeout(handleCloseModal, 500);
        })
        .catch((err) => {
          console.error(err);
          showToast(err.toString(), "error");
        });
    } else if (modalType === "edit") {
      const patchField = (field, value) =>
        fetch(`http://localhost:7070/api/dishes/${id}/${field}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(value),
        });

      const putRecipe = () =>
        fetch(`http://localhost:7070/api/dishes/${id}/recipe`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            allergens: formData.allergens,
            recipe: payload.recipe,
          }),
        });

      Promise.all([
        patchField("name", formData.title),
        patchField("description", formData.description),
        patchField("kcal", Number(formData.calories)),
        patchField("protein", Number(formData.protein)),
        patchField("carbohydrates", Number(formData.carbs)),
        patchField("fat", Number(formData.fat)),
        putRecipe(),
      ])
        .then((responses) => {
          if (responses.every((res) => res.ok)) {
            showToast(`${formData.title} er blevet opdateret`);
            return fetch("http://localhost:7070/api/dishes", {
              headers: { Authorization: `Bearer ${token}` },
            });
          } else {
            throw new Error("Fejl ved opdatering");
          }
        })
        .then((res) => res.json())
        .then((data) => {
          setMenuItems(data);
          handleCloseModal();
        })
        .catch((err) => {
          console.error(err);
          showToast("Kunne ikke opdatere retten", "error");
        });
    }
  };

  const handleDelete = () => {
    if (!currentItem) return;
    const token = localStorage.getItem("token");
    fetch(`http://localhost:7070/api/dishes/${currentItem.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Kunne ikke slette retten");
        showToast(`${currentItem.title || currentItem.name} er blevet slettet`);
        setMenuItems((prev) =>
          prev.filter((item) => item.id !== currentItem.id)
        );
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
        showToast("Fejl under sletning: " + err.message, "error");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={hideToast}
      />
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Menustyring</h1>
          <div className="flex gap-3">
            <Link
              to="/calendar"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center text-lg"
            >
              <CalendarIcon className="w-6 h-6 mr-2" />
              Kalender
            </Link>
            <button
              onClick={handleAddClick}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center text-lg"
            >
              <Plus className="w-6 h-6 mr-2" />
              Tilføj ny ret
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Titel
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Beskrivelse
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Handlinger
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
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
                    colSpan="3"
                    className="px-6 py-4 text-center text-base text-gray-500"
                  >
                    Ingen retter tilføjet endnu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
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
