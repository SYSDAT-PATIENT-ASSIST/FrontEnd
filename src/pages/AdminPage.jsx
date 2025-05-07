import { Link } from 'react-router';

const AdminPage = () => {
  return (
    <div className='flex-1 flex flex-col items-center justify-center p-4'>
      <Link 
        to="/auth/login" 
        className="bg-white text-black w-[32rem] h-[12rem] flex items-center justify-center rounded-2xl hover:bg-gray-200 text-4xl font-extrabold shadow-2xl"
      >
        Personale
      </Link>
    </div>
  );
};

export default AdminPage;
