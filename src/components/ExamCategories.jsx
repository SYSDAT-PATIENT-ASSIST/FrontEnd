import React, { useState, useEffect } from "react";
import { Link, useParams} from "react-router";
import "../styles/exams.css";

// Component: List all top-level categories
export function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    //Test af errorhåndtering
    //throw new Error("Simuleret frontend-fejl");
    
    fetch("http://localhost:9999/api/examinations-and-treatments/categories")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setCategories(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div className="error">Fejl: {error}</div>;
  if (!categories.length) return <div>Indlæser kategorier…</div>;

  return (
    
    <div className="categories-container">
      {categories.map(cat => (
        <div key={cat.id} className="category-card">
          <Link to={cat.url_safe_name} className="category-link">
            <h2>{cat.name}</h2>
          </Link>
          {cat.description && <p>{cat.description}</p>}
        </div>
      ))}
    </div>
  );
}

