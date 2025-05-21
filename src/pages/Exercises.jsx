import React from 'react';
import SortExercises from '../components/SortExercises';
import '../styles/Home.css';
import '../styles/SortExercises.css';
import { useTranslation } from "react-i18next";

export default function Exercises() {

  const { t } = useTranslation();

  return (
    <div className="home__container">
      <h1 style={{ marginBottom: '1rem', color: '#fff' }}>{t("overviewExercises")}</h1>
      <SortExercises />
    </div>
  );
}