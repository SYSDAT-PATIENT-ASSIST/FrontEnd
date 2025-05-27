import React from "react";
import { useParams } from "react-router";
import ExamTreatArticle from "./ExamTreatArticles";

function ExamTreatArticleWrapper() {
  const { name } = useParams();

  return <ExamTreatArticle articleName={name} />;
}

export default ExamTreatArticleWrapper;
