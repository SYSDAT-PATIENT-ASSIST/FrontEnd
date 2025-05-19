import React, { useState, useEffect } from "react";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { Link } from "react-router";
import MenuItem from "../components/menu/MenuItem";
import MenuModal from "../components/menu/MenuModal";
import Toast from "../components/ui/Toast";
import { initialMenuItems } from "../data/menuItems";
import "../styles/dialog.css";

function MenuManagement() {
  const [menuItems, setMenuItems] = useState([]);
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'view', 'delete'
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    allergens: "",
    ingredients: "",
    recipe: "",
  });
  const [errors, setErrors] = useState({});

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success", // can be 'success', 'error', etc.
  });

  // Function to show toast notification
  // This function sets the toast state to visible with a message and type
  const showToast = (message, type = "success") => {
    setToast({
      visible: true,
      message,
      type,
    });
  };

  // Function to hide toast notification
  const hideToast = () => {
    setToast((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:7070/api/dishes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fejl ved indlæsning af menu");
        return res.json();
      })
      .then((data) => setMenuItems(data))
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
      allergens: "",
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
      allergens: item.allergens?.join(", ") || "",
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log("Field changed:", name, value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Titel er påkrævet";
    } else if (formData.title.length > 50) {
      newErrors.title = "Titel må maksimalt være 50 tegn";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Beskrivelse er påkrævet";
    } else if (formData.description.length > 500) {
      newErrors.description = "Beskrivelse må maksimalt være 500 tegn";
    }

    if (!formData.calories || formData.calories <= 0) {
      newErrors.calories = "Kalorier er påkrævet";
    }

    if (!formData.protein || formData.protein <= 0) {
      newErrors.protein = "Protein er påkrævet";
    }

    if (!formData.carbs || formData.carbs <= 0) {
      newErrors.carbs = "Kulhydrater er påkrævet";
    }

    if (!formData.fat || formData.fat <= 0) {
      newErrors.fat = "Fedt er påkrævet og skal være positivt";
    }

    if (!formData.allergens.trim()) {
      newErrors.allergens = "Allergener er påkrævet";
    }

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = "Ingredienser er påkrævet";
    }

    if (!formData.recipe.trim()) {
      newErrors.recipe = "Opskrift er påkrævet";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    const isValid = validateForm();
    console.log("Form valid:", isValid);
    console.log("Form errors:", errors);
    console.log("Form data:", formData);

    if (!isValid) return;

    const token = localStorage.getItem("token");
    const id = currentItem?.id;

    if (modalType === "add") {
      const newDishPayload = {
        name: formData.title,
        description: formData.description,
        kcal: Number(formData.calories),
        protein: Number(formData.protein),
        carbohydrates: Number(formData.carbs),
        fat: Number(formData.fat),
        status: "tilgængelig",
        allergens: formData.allergens
          .split(",")
          .map((a) => a.trim().toUpperCase())
          .filter(Boolean),
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

      fetch("http://localhost:7070/api/dishes/full", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newDishPayload),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Kunne ikke tilføje ret");
          return res.json();
        })
        .then(() => {
          return fetch("http://localhost:7070/api/dishes", {
            headers: { Authorization: `Bearer ${token}` },
          });
        })
        .then((res) => res.json())
        .then((updatedMenu) => {
          setMenuItems(updatedMenu);
          showToast(`${formData.title} er tilføjet!`);

          // Close the modal after a short delay
          setTimeout(() => {
            handleCloseModal();
          }, 500); // 500 ms pause
        })

        .catch((err) => {
          console.error(err);
          showToast(err.message, "error");
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
          //body: String(value), 
        });

      const putRecipe = () =>
        fetch(`http://localhost:7070/api/dishes/${id}/recipe`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            allergens: formData.allergens
              .split(",")
              .map((a) => a.trim().toUpperCase())
              .filter(Boolean),
            recipe: {
              title: formData.title,
              instructions: formData.recipe.trim(),
              ingredients: formData.ingredients
                .split("\n")
                .map((i) => ({ name: i.trim() }))
                .filter((i) => i.name),
            },
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
          const allOk = responses.every((res) => res.ok);
          if (!allOk) throw new Error("Fejl ved opdatering");
          showToast(`${formData.title} er blevet opdateret`);
          return fetch("http://localhost:7070/api/dishes", {
            headers: { Authorization: `Bearer ${token}` },
          });
        })
        .then((res) => res.json())
        .then((updated) => {
          setMenuItems(updated);
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
      {/* Toast notification */}
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
