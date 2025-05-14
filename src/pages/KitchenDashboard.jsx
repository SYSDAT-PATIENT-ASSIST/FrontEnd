import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchDishes } from "../api";
import {
  UtensilsCrossed,
  CalendarDays,
  ClipboardList,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const KitchenDashboard = () => {
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
      return;
    }

    fetchDishes()
      .then(setDishes)
      .catch(() => {
        console.error("Failed to fetch dishes");
        navigate("/auth/login");
      });
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Velkommen til køkkenet
        </h1>
        <p className="text-gray-600 mb-6">Administrer menuer og måltider</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Link to="/menu" className="p-4 bg-blue-100 rounded hover:bg-blue-200">
            <UtensilsCrossed className="w-6 h-6 text-blue-600" />
            <p className="mt-2 font-semibold">Menustyring</p>
          </Link>

          <Link to="/calendar" className="p-4 bg-green-100 rounded hover:bg-green-200">
            <CalendarDays className="w-6 h-6 text-green-600" />
            <p className="mt-2 font-semibold">Måltidskalender</p>
          </Link>

          <Link to="/orders" className="p-4 bg-purple-100 rounded hover:bg-purple-200">
            <ClipboardList className="w-6 h-6 text-purple-600" />
            <p className="mt-2 font-semibold">Bestillinger</p>
          </Link>
        </div>

        <div className="bg-gray-50 p-4 rounded">
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" /> Aktive retter
          </h2>

          {dishes.length === 0 ? (
            <p className="text-gray-500">Ingen retter fundet.</p>
          ) : (
            <ul className="list-disc ml-6">
              {dishes.map((dish) => (
                <li key={dish.id} className="text-gray-800">{dish.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default KitchenDashboard;
