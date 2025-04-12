import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import Index from './pages/Index.jsx'
import Home from './pages/Home.jsx'
import Settings from './pages/Settings.jsx'
import CalendarLanding from './pages/CalendarLanding.jsx'
import Calendar from './pages/Calendar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="settings" element={<Settings />} />
          </Route>
            <Route path="calendar" element={<CalendarLanding />} />
            <Route path="calendar/events" element={<Calendar />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
