import React, { useState } from "react";
import { Routes, Route } from "react-router";
import { CategoriesList } from "../components/ExamCategories.jsx";
import { CategoryDetail } from "../components/ExamCategoriesDetails.jsx";
import ExamTreatArticle from "../components/ExamTreatArticles.jsx"; // default import
import ErrorComponentBoundary from "../components/ErrorComponentBoundary.jsx";

export default function ExamsAndTreatmentsRoutes() {
  const [showModal, setShowModal] = useState(true);

  return (
    <ErrorComponentBoundary
      componentFailed="Sygdom og Behandling"
      onRetry={() => window.location.reload()}
    >
      {/* InfoModal */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2 style={{ marginBottom: "1rem" }}>Information</h2>
            <p>Dette indhold er primært målrettet sundhedsprofessionelle.</p>
            <button style={buttonStyle} onClick={() => setShowModal(false)}>
              OK
            </button>
          </div>
        </div>
      )}

      <Routes>
        <Route index element={<CategoriesList />} />
        <Route path=":categoryName" element={<CategoryDetail />} />
        <Route path=":categoryName/:articleName" element={<ExamTreatArticle/>} />
        <Route path="*" element={<div>404 - Side ikke fundet</div>} />
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
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "2rem",
  maxWidth: "500px",
  color: "black",
  textAlign: "center",
  fontSize: "1.5rem",
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
