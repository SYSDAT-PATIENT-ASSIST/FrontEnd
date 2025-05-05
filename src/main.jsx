import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Index from "./pages/Index.jsx";
import BestillingsinfoPage from "./pages/Bestillingsinfo.jsx";
import "./styles/index.css";
import "./styles/Tailwind.css";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        
          <Route path="/" element={<Index />} />
          <Route path="bestillingsinfo" element={<BestillingsinfoPage />} />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
