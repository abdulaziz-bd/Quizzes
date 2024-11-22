import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ErrorImg from "../../assets/error.png";
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
    return (
      <div className="text-center py-8 text-gray-600">
        Loading quizzes... Please wait
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 min-h-[200px] flex flex-col items-center">
        <img
          src={ErrorImg}
          alt="Server Error"
          className="w-[100px] h-[100px] mb-4"
        />
        <div className="text-red-500 mb-2 text-xl">
          Unable to load quizzes at this time
        </div>
        <div className="text-gray-600 text-lg">
          Please check your internet connection and try again. If the problem
          persists, the server might be temporarily unavailable.
        </div>
      </div>
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
        <div className="text-center py-8 text-gray-600">
          No quizzes are available at the moment
        </div>
      )}
    </section>
  );
}
