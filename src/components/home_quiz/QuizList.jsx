import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { useQuizSet } from "../../hooks/useQuizSet";
import { fetchQuizSets } from "../../redux/features/quizSet/quizSetSlice";
import QuizCard from "./QuizCard";

export default function QuizList() {
  const dispatch = useDispatch();
  const { quizzes, loading, error } = useQuizSet();
  const { auth } = useAuth();

  useEffect(() => {
    dispatch(fetchQuizSets());
  }, [dispatch, auth]);

  if (loading) {
    return <div>Loading quizzes...</div>;
  }

  if (error) {
    return (
      <div>Error: {typeof error === "string" ? error : error.message}</div>
    );
  }

  return (
    <section>
      <h3 className="text-2xl font-bold mb-6">Participate In Quizees</h3>

      {Array.isArray(quizzes) && quizzes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      ) : (
        <div>No quizzes available</div>
      )}
    </section>
  );
}
