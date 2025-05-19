import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChefHat, User, Lock, LogIn } from 'lucide-react';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: Implement actual authentication
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      navigate('/kitchen');
    } catch (err) {
      setError('Ugyldige loginoplysninger. Prøv igen.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
      <div className='text-center mb-8'>
        <div className='flex items-center justify-center mb-4'>
          <ChefHat className='w-12 h-12 text-blue-600' />
        </div>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>
          Velkommen til køkkenet
        </h1>
        <p className='text-gray-600'>
          Log ind for at administrere menuen og måltidsplaner
        </p>
      </div>

      {error && (
        <div className='mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded'>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='username'
          >
            Brugernavn
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <User className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='text'
              id='username'
              name='username'
              value={formData.username}
              onChange={handleChange}
              className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Indtast dit brugernavn'
              required
            />
          </div>
        </div>

        <div>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            Adgangskode
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Lock className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Indtast din adgangskode'
              required
            />
          </div>
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
          ) : (
            <>
              <LogIn className='w-5 h-5 mr-2' />
              Log ind
            </>
          )}
        </button>
      </form>
      <div className="mt-6 text-center">
  <button
    onClick={() => navigate('/MissingOrders')}
    type="button"
    className="inline-flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 text-sm font-medium rounded-md hover:bg-blue-50 transition"
  >
    Gå til Manglende bestillinger
  </button>
</div>

    </div>
  );
};

export default LoginForm;
