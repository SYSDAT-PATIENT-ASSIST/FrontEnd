import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UtensilsCrossed,
  CalendarDays,
  ClipboardList,
  TrendingUp,
} from 'lucide-react';
import { getToken } from '../utils/auth';

const KitchenDashboard = () => {
  const [dishCount, setDishCount] = useState(0);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const token = await getToken();
        const res = await fetch('http://localhost:7070/api/dishes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Kunne ikke hente retter');
        const data = await res.json();
        setDishCount(data.length);
      } catch (err) {
        console.error('Fejl ved hentning af retter:', err);
        setDishCount(0);
      }
    };

    fetchDishes();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <div className='bg-white rounded-lg shadow p-6'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>
            Velkommen til køkkenet
          </h1>
          <p className='text-gray-600'>
            Administrer menuer, måltidsplaner og køkkenopgaver
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          <Link
            to='/menu'
            className='p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors'
          >
            <div className='flex items-center'>
              <UtensilsCrossed className='w-8 h-8 text-blue-600 mr-4' />
              <div>
                <h2 className='text-xl font-semibold text-gray-800 mb-1'>
                  Menustyring
                </h2>
                <p className='text-gray-600'>Administrer retter og måltider</p>
              </div>
            </div>
          </Link>

          <Link
            to='/calendar'
            className='p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors'
          >
            <div className='flex items-center'>
              <CalendarDays className='w-8 h-8 text-green-600 mr-4' />
              <div>
                <h2 className='text-xl font-semibold text-gray-800 mb-1'>
                  Måltidskalender
                </h2>
                <p className='text-gray-600'>Planlæg måltider og menuer</p>
              </div>
            </div>
          </Link>

          <Link
            to='/orders'
            className='p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors'
          >
            <div className='flex items-center'>
              <ClipboardList className='w-8 h-8 text-purple-600 mr-4' />
              <div>
                <h2 className='text-xl font-semibold text-gray-800 mb-1'>
                  Bestillinger
                </h2>
                <p className='text-gray-600'>
                  Se og håndter måltidsbestillinger
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className='bg-gray-50 rounded-lg p-6'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center'>
            <TrendingUp className='w-6 h-6 mr-2 text-gray-600' />
            Dagens overblik
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='bg-white p-4 rounded-lg shadow-sm'>
              <p className='text-gray-600 text-sm'>Aktive retter</p>
              <p className='text-2xl font-bold text-gray-800'>{dishCount}</p>
            </div>

            <div className='bg-white p-4 rounded-lg shadow-sm'>
              <p className='text-gray-600 text-sm'>Dagens bestillinger</p>
              <p className='text-2xl font-bold text-gray-800'>156</p>
            </div>

            <div className='bg-white p-4 rounded-lg shadow-sm'>
              <p className='text-gray-600 text-sm'>Planlagte måltider</p>
              <p className='text-2xl font-bold text-gray-800'>18</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenDashboard;
