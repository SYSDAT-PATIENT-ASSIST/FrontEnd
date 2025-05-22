import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../styles/exams.css";

function ExamTreatArticle() {
  const { categoryName, articleName } = useParams();
  const [article, setArticle] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = articleName || categoryName;

    if (!id) {
      setError("No article specified");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    fetch(`http://localhost:9999/api/examinations-and-treatments/articles/${id}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.article) {
          setArticle(data.article);
          setError(null);
        } else {
          setError("Article not found");
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
          setError("Failed to load article. Please try again later.");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort(); 
  }, [categoryName, articleName]);

  if (loading)
    return <div className="exam-treat__container" style={{ padding: "1rem" }}>Loading...</div>;

  if (error)
    return <div className="exam-treat__container" style={{ padding: "1rem" }}>{error}</div>;

  return (
    <div className="exam-treat__container">
      <div dangerouslySetInnerHTML={{ __html: article }} />
    </div>
  );
}

export default ExamTreatArticle;
