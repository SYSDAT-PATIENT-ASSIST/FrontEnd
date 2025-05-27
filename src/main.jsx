import "./styles/tailwind.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";


import Calendar from "./pages/Calendar.jsx";
import CalendarLanding from './components/calendar/CalendarLanding.jsx'
import CalendarView from './components/calendar/CalendarView.jsx'
import DishCalendarPage from './pages/DishCalenderPage.jsx'
import ExamsAndTreatmentsRoutes from './pages/Exam.jsx';
import Exercises from "./pages/Exercises.jsx";
import Home from "./pages/Home.jsx";
import Index from "./pages/Index.jsx";
import KitchenDashboard from "./pages/KitchenDashboard.jsx";
import LinkToPatientWebsite from "./pages/LinkToPatientWebsite.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MenuManagement from "./pages/MenuManagment.jsx";
import MissingOrders from './pages/MissingOrders.jsx';
import OrderFood from "./pages/OrderFood.jsx";
import Settings from "./pages/Settings.jsx";
import { SettingsProvider } from "./components/SettingsContext";

createRoot(document.getElementById("root")).render(
  <SettingsProvider>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}>
            <Route index element={<Home />} />
            <Route path="/DishCalenderPage" element={<DishCalendarPage />} />
            <Route path="/MissingOrders" element={<MissingOrders />} />
            <Route path="/exams/*" element={<ExamsAndTreatmentsRoutes />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="Link" element={<LinkToPatientWebsite />} />
            <Route path="auth/login" element={<LoginPage />} />
            <Route path="home" element={<Home />} />
            <Route path="kitchen" element={<KitchenDashboard />} />
            <Route path="menu" element={<MenuManagement />} />
            <Route path="orderfood" element={<OrderFood />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/calendar" element={<Calendar />}>
            <Route index element={<CalendarLanding />} />
            <Route path="view" index element={<CalendarView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </SettingsProvider>
);
