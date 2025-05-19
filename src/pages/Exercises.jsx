import React from 'react';
import SortExercises from '../components/SortExercises';
import '../styles/Home.css';
import '../styles/SortExercises.css';

export default function Exercises() {
  return (
    <div className="home__container">
      <h1 style={{ marginBottom: '1rem', color: '#fff' }}>All Exercises</h1>
      <SortExercises />
    </div>
  );
}