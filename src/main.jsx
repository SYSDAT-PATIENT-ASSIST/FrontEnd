import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"

import Index from './pages/Index.jsx'
import Home from './pages/Home.jsx'
import Settings from './pages/Settings.jsx'
import OrderFood from './pages/OrderFood.jsx'

import Calendar from './pages/Calendar.jsx'
import CalendarLanding from './components/CalendarLanding.jsx'
import CalendarView from './components/CalendarView.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="settings" element={<Settings />} />
            <Route path="orderfood" element={<OrderFood />} />
          </Route>
          <Route path="/calendar" element={<Calendar />}>
            <Route index element={<CalendarLanding />} />
            <Route path="view" index element={<CalendarView />} />
          </Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
