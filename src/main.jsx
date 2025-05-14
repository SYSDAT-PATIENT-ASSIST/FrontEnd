import './styles/tailwind.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';


import Index from './pages/Index.jsx';
import Home from './pages/Home.jsx';
import Settings from './pages/Settings.jsx';
import Calendar from './pages/Calendar.jsx';
import MenuManagement from './pages/MenuManagment.jsx';
import KitchenDashboard from './pages/KitchenDashboard.jsx';
import LoginPage from './pages/LoginPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />}>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='calendar' element={<Calendar />} />
          <Route path='menu' element={<MenuManagement />} />
          <Route path='kitchen' element={<KitchenDashboard />} />
          <Route path='auth/login' element={<LoginPage />} />
          <Route path='settings' element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
