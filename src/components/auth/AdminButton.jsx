import { User } from 'lucide-react';
import { Link } from 'react-router';

const AdminButton = () => {
  return (
    <Link
      to='auth/admin'  
      className='flex items-center justify-center h-full bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors px-3'
    >
      <div className='flex flex-col items-center justify-center'>
        <User className='w-5 h-5' />
        <span className='text-xs font-medium'>Admin</span>
      </div>
    </Link>
  );
};

export default AdminButton;