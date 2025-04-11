import './styles/tailwind.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import Index from './pages/Index.jsx';
import Home from './pages/Home.jsx';
import Settings from './pages/Settings.jsx';
import Calendar from './pages/Calendar.jsx';
import MenuManagement from './pages/MenuManagment.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />}>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='calendar' element={<Calendar />} />
          <Route path='menu' element={<MenuManagement />} />
          <Route path='settings' element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
