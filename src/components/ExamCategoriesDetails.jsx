import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import "../styles/exams.css";

export function CategoryDetail() {
  const { categoryName } = useParams();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const [openSub, setOpenSub] = useState(null); // Track which subcategory is open
  const [openTreatments, setOpenTreatments] = useState({}); // Track open treatments per sub

  useEffect(() => {
    fetch(
      `http://localhost:9999/api/examinations-and-treatments/categories/${categoryName}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setItems(data))
      .catch((err) => setError(err.message));
  }, [categoryName]);

  const toggleSub = (id) => {
    setOpenSub((prev) => (prev === id ? null : id));
  };

  const toggleTreatment = (subId, treatId) => {
    setOpenTreatments((prev) => {
      const currentOpen = prev[subId] || [];
      const isOpen = currentOpen.includes(treatId);
      return {
        ...prev,
        [subId]: isOpen
          ? currentOpen.filter((id) => id !== treatId) // close
          : [...currentOpen, treatId], // open
      };
    });
  };

  if (error) return <div className="team-g__error">Fejl: {error}</div>;
  if (!items.length) return <div>Indlæser…</div>;

  return (
    <div className="team-g__detail-container">
      <Link to=".." className="team-g__back-link">
        ← Tilbage til kategorier
      </Link>
      {items.map((sub) => (
        <section key={sub.id} className="team-g__subcategory-section">
          <button
            className="team-g__subcategory-toggle"
            onClick={() => toggleSub(sub.id)}
          >
            <h3>{sub.name}</h3>
          </button>

          {openSub === sub.id && (
            <>
              {sub.exams_and_treats.length > 0 ? (
                <div className="team-g__treatments-list">
                  {sub.exams_and_treats.map((t) => (
                    <div key={t.id} className="team-g__treatment-wrapper">
                      <a
                        className={`team-g__treatment-toggle${
                          (openTreatments[sub.id] || []).includes(t.id)
                            ? " open"
                            : ""
                        }`}
                        href={t.src_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => toggleTreatment(sub.id, t.id)}
                      >
                        <h4>{t.name}</h4>
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Ingen behandlinger/undersøgelser tilgængelige.</p>
              )}
            </>
          )}
        </section>
      ))}
    </div>
  );
}
