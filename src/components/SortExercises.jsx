import React, { useState } from "react";
//import '../styles/SortExercises.css'
import ExerciseCard from './ExerciseCard';
import { useTranslation } from "react-i18next";


// Dummy video data
export const videos = [
  {
    id: 1,
    title: "Rehabilitate Back",
    category: "Back",
    date: "2024-12-01",
    duration: 300,
    videoId: "PTgQsURc3i8",           // <-- your YouTube ID
  },
  {
    id: 2,
    title: "Build Arms",
    category: "Arms",
    date: "2024-11-20",
    duration: 180,
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Leg Day Strength",
    category: "Legs",
    date: "2024-10-05",
    duration: 240,
    videoId: "M7lc1UVf-VE",
  },
];

// Filter + sort funktion
function getFilteredAndSortedVideos(videos, category, sortType) {
  let filtered = category === "All"
    ? videos
    : videos.filter(video => video.category === category);

  switch (sortType) {
    case "title":
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "date":
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "duration":
      filtered.sort((a, b) => a.duration - b.duration);
      break;
    default:
      break;
  }

  return filtered;
}

// Tilfældig video
function getRandomVideo(videos) {
  const index = Math.floor(Math.random() * videos.length);
  return videos[index];
}

// Video preview grid, now using ExerciseCard
const SortExercisesGrid = ({ videos, progressMap, onProgressChange }) => (
  <section className="exercises__grid">
    {videos.map(video => (
      <ExerciseCard 
        key={video.id} 
        video={video}
        progress={progressMap[video.id]}
        onProgressChange={onProgressChange} 
      />
    ))}
  </section>
);

// Hovedkomponent
const SortExercises = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortType, setSortType] = useState("date");

  const filteredVideos = getFilteredAndSortedVideos(videos, selectedCategory, sortType);

  const [progressMap, setProgressMap] = useState(() => {
    const stored = sessionStorage.getItem('exerciseProgress');
    return stored ? JSON.parse(stored) : {};
  });

  const handleProgressChange = (videoId, status) => {
    setProgressMap(prev => {
      const current = prev[videoId];
      if (current === 'completed') return prev;
      const updated = { ...prev, [videoId]: status};
      sessionStorage.setItem('exerciseProgress', JSON.stringify(updated));
      return updated;
    });
  };  


  return (
    <main className="exercises__wrapper">
      <section className="exercises__controls">
        <div className="exercises__control-group">
          <label htmlFor="category" className="exercises__label">{t("categoryExercises")}</label>
          <select
            id="category"
            className="exercises__select"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="All">{t("allExercises")}</option>
            <option value="Back">{t("backExercises")}</option>
            <option value="Arms">{t("armsExercises")}</option>
            <option value="Legs">{t("legsExercises")}</option>
          </select>
        </div>

        <div className="exercises__control-group">
          <label htmlFor="sort" className="exercises__label">{t("sortByExercises")}</label>
          <select
            id="sort"
            className="exercises__select"
            value={sortType}
            onChange={e => setSortType(e.target.value)}
          >
            <option value="date">{t("newestExercises")}</option>
            <option value="title">{t("alphabeticalExercises")}</option>
            <option value="duration">{t("shortestExercises")}</option>
          </select>
        </div>

        <div className="exercises__random">
          <button
            className="exercises__button"
            onClick={() => {
              const randomVideo = getRandomVideo(videos);
              alert(`Random video: ${randomVideo.title}`);
            }}
          >
            {t("showRandomExercise")}
          </button>
        </div>
      </section>

      <SortExercisesGrid videos={filteredVideos} progressMap={progressMap} onProgressChange={handleProgressChange} />
    </main>
  );
};

export default SortExercises;