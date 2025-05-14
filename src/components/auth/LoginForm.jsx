import { useState } from "react";
import { useNavigate } from "react-router";
import { ChefHat, User, Lock, LogIn } from "lucide-react";
import { login } from "../api";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { token } = await login(formData.username, formData.password);
      if (!token) throw new Error("No token returned");
      localStorage.setItem("token", token);
      navigate("/kitchen");
    } catch (err) {
      setError("Ugyldige loginoplysninger. Prøv igen.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <ChefHat className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Velkommen til køkkenet</h1>
        <p className="text-gray-600">Log ind for at administrere menuen og måltidsplaner</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Brugernavn
          </label>
          <div className="relative">
            <User className="absolute inset-y-0 left-0 w-5 h-5 text-gray-400 ml-3 my-auto" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              placeholder="Indtast dit brugernavn"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Adgangskode
          </label>
          <div className="relative">
            <Lock className="absolute inset-y-0 left-0 w-5 h-5 text-gray-400 ml-3 my-auto" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              placeholder="Indtast din adgangskode"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {isLoading ? <div className="loader" /> : (
            <>
              <LogIn className="w-5 h-5 inline-block mr-2" />
              Log ind
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
