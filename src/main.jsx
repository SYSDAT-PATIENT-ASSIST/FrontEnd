import './styles/tailwind.css';
import { StrictMode } from "react";;
import { createRoot } from "react-dom/client";;
import { BrowserRouter, Routes, Route } from 'react-router';;

import Index from "./pages/Index.jsx";;
import Home from "./pages/Home.jsx";;
import Settings from "./pages/Settings.jsx";;
import MenuManagement from './pages/MenuManagment.jsx';
import KitchenDashboard from './pages/KitchenDashboard.jsx';
import LoginPage from './pages/LoginPage.jsx';

import Calendar from "./pages/Calendar.jsx";
import DishCalendarPage from './pages/DishCalenderPage.jsx'
import CalendarLanding from "./components/calendar/CalendarLanding.jsx";
import CalendarView from "./components/calendar/CalendarView.jsx";
import { SettingsProvider } from "./components/SettingsContext";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="settings" element={<Settings />} />
          <Route path='menu' element={<MenuManagement />} />
          <Route path='kitchen' element={<KitchenDashboard />} />
          <Route path='auth/login' element={<LoginPage />} />
          <Route path="/DishCalenderPage" element={<DishCalendarPage />} />
        </Route>
        <Route path="/calendar" element={<Calendar />}>
          <Route index element={<CalendarLanding />} />
          <Route path="view" index element={<CalendarView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
