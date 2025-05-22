import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { CategoriesList } from "../components/ExamCategories.jsx";
import { CategoryDetail } from "../components/ExamCategoriesDetails.jsx";
import ErrorComponentBoundary from "../components/ErrorComponentBoundary.jsx";

export default function ExamsAndTreatmentsRoutes() {
  const [showModal, setShowModal] = useState(true);

  return (
    <ErrorComponentBoundary componentFailed="Sygdom og Behandling" onRetry={() => window.location.reload()}>
      {/* InfoModal */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2 style={{ marginBottom: "1rem" }}>Information</h2>
            <p>Dette indhold er primært målrettet sundhedsprofessionelle.</p>
            <button style={buttonStyle} onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}

      <Routes>
        <Route index element={<CategoriesList />} />
        <Route path=":categoryName" element={<CategoryDetail />} />
      </Routes>
    </ErrorComponentBoundary>
  );
}

// Styles
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(255, 255, 255, 0.5)", // semi-transparent dark blue
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "2rem",
  maxWidth: "400px",
  color: "black",
  textAlign: "center",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
};

const buttonStyle = {
  marginTop: "1rem",
  padding: "0.5rem 1rem",
  backgroundColor: "#b7daff",
  color: "black",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
