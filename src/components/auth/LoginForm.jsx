import { useState } from 'react';
import { useNavigate } from 'react-router';
import facade from '../../data/apiFacade';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await facade.login(formData.username, formData.password);
      navigate('/kitchenStaff');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Ugyldige loginoplysninger. Prøv igen.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[500px] mx-auto mt-24">
      {/* Større "Personale Login" boks */}
      <div className="w-full bg-white text-black text-center py-6 mb-8 shadow-md rounded-xl">
        <h1 className="text-3xl font-semibold">Personale Login</h1>
      </div>

      {/* Hvid baggrund for selve login-formen */}
      <div className="bg-white p-8 rounded-xl shadow-2xl">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <label htmlFor="username" className="block text-2xl font-semibold text-gray-600 mb-2">
              Brugernavn
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-6 py-4 text-xl text-gray-600 bg-gray-200 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder=""
                required
              />
            </div>
          </div>

          <div className="text-center">
            <label htmlFor="password" className="block text-2xl font-semibold text-gray-600 mb-2">
              Adgangskode
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-6 py-4 text-xl text-gray-600 bg-gray-200 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder=""
                required
              />
            </div>
          </div>

          {/* Centrering af knappen med flex */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-[70%] bg-blue-600 text-white py-3 rounded-xl text-xl font-bold hover:bg-blue-700 transition ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
