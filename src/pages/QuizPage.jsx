import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import QuizQuestions from "../components/quiz/QuizQuestions";
import QuizSetInfo from "../components/quiz/QuizSetInfo";
import { useQuiz } from "../hooks/useQuiz";
import { fetchQuiz, resetQuizAnswers } from "../redux/features/quiz/quizSlice";

export default function QuizPage() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quiz, loading, error } = useQuiz();
  const quizSetId = params.quizSetId;

  useEffect(() => {
    document.title = "Quiz";
  }, []);

  useEffect(() => {
    if (quizSetId) {
      dispatch(fetchQuiz(quizSetId));
    }
  }, [dispatch, quizSetId]);

  useEffect(() => {
    dispatch(resetQuizAnswers());
  }, []);

  if (!quizSetId || quiz?.user_attempted?.attempted === true) {
    navigate("/");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        Error: {error?.message || error}
      </div>
    );
  }

  return (
    <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
        {quiz && <QuizSetInfo />}

        {quiz && <QuizQuestions />}
      </div>
    </main>
  );
}
