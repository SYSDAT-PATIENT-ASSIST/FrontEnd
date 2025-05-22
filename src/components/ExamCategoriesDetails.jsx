import React, { useState, useEffect } from "react";
import { Link, useParams} from "react-router";
import "../styles/exams.css";

// Component: Show subcategories and treatments of a given top-level category
export function CategoryDetail() {
  const { categoryName } = useParams();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:9999/api/examinations-and-treatments/categories/${categoryName}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setItems(data))
      .catch(err => setError(err.message));
  }, [categoryName]);

  if (error) return <div className="team-g__error">Fejl: {error}</div>;
  if (!items.length) return <div>Indlæser…</div>;

  return (
    <div className="team-g__detail-container">
      <Link to=".." className="team-g__back-link">← Tilbage til kategorier</Link>
      {items.map(sub => (
        <section key={sub.id} className="team-g__subcategory-section">
          <h3>{sub.name}</h3>
          {sub.exams_and_treats.length > 0 ? (
            <div className="team-g__treatments-list">
              {sub.exams_and_treats.map(t => (
                <div key={t.id} className="team-g__treatment-card">
                  <a href={t.src_url} target="_blank" rel="noopener noreferrer">
                    <h4>{t.name}</h4>
                  </a>
                  {t.description && <p>{t.description}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p>Ingen behandlinger/undersøgelser tilgængelige.</p>
          )}
        </section>
      ))}
    </div>
  );
}