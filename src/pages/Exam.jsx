import React from "react";
import { Routes, Route } from "react-router";
import { CategoriesList } from "../components/ExamCategories.jsx";
import { CategoryDetail } from "../components/ExamCategoriesDetails.jsx";
import ErrorComponentBoundary from "../components/ErrorComponentBoundary.jsx";

export default function ExamsAndTreatmentsRoutes() {
  return (
      <ErrorComponentBoundary componentFailed="Sygdom og Behandling" onRetry={() => window.location.reload()}>
    <Routes>
      {/* Index = landing når du besøger /exams */}
      <Route index element={<CategoriesList />} />
      {/* Detail når du besøger /exams/:categoryName */}
      <Route path=":categoryName" element={<CategoryDetail />} />
    </Routes>
      </ErrorComponentBoundary>
  );
}