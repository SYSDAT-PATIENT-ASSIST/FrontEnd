import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChefHat, User, Lock, LogIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const { t } = useTranslation();
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
      const response = await fetch('http://localhost:9999/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.username,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login mislykkedes');
      }

      const data = await response.json();

      // Store token if returned
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      navigate('/kitchen');
    } catch (err) {
      setError(err.message || 'Ugyldige loginoplysninger. Prøv igen.');
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
          {t('loginWelcome')}
        </h1>
        <p className='text-gray-600'>{t('loginSubtitle')}</p>
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
            {t('loginUsername')}
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
              placeholder={t('loginUsernamePlaceholder')}
              required
            />
          </div>
        </div>

        <div>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            {t('loginPassword')}
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
              placeholder={t('loginPasswordPlaceholder')}
              required
            />
          </div>
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
        >
          {isLoading ? (
            <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
          ) : (
            <>
              <LogIn className='w-5 h-5 mr-2' />
              {t('loginButton')}
            </>
          )}
        </button>
      </form>
      <div className="mt-6 text-center">
      <div className="mt-6 text-center">
  <button
    onClick={() => navigate('/MissingOrders')}
    type="button"
    className="w-full flex justify-center items-center py-2 px-4 border border-blue-500 text-white bg-blue-500 rounded-md shadow-sm text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
  >
    Sundhedspersonale
  </button>
</div>

</div>

    </div>
  );
};

export default LoginForm;
