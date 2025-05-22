import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../styles/Exams.css";

function ExamTreatArticle() {
  const { categoryName, articleName } = useParams();
  const [article, setArticle] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = articleName || categoryName;
    if (!id) {
      setError("No article specified");
      return;
    }

    fetch(`http://localhost:9999/api/examinations-and-treatments/articles/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        if (data && data.article) {
          setArticle(data.article);
          setError(null);
        } else {
          setError("Article not found");
        }
      })
      .catch(() => setError("Failed to load article"));
  }, [categoryName, articleName]);

  if (error)
    return <div className="exam-treat__container" style={{ padding: "1rem" }}>{error}</div>;

  return (
    <div className="exam-treat__container">
      <div dangerouslySetInnerHTML={{ __html: article }} />
    </div>
  );
}

export default ExamTreatArticle;
