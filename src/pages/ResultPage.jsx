import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import WhiteLogo from "../assets/logo-white.svg";
import QuizAnsweredQuestions from "../components/result/QuizAnsweredQuestions";
import QuizResultInfo from "../components/result/QuizResultInfo";
import { useAuth } from "../hooks/useAuth";
import { useQuiz } from "../hooks/useQuiz";
import { fetchQuiz } from "../redux/features/quiz/quizSlice";
import { fetchQuizSetAttempts } from "../redux/features/quizSet/quizSetSlice";

export default function ResultPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quiz, loading, error } = useQuiz();
  const params = useParams();
  const quizId = params.quizId;
  const { auth } = useAuth();

  useEffect(() => {
    document.title = "Quiz - Result";
  }, []);

  const userId = useMemo(() => auth?.user?.id, [auth?.user?.id]);

  useEffect(() => {
    dispatch(fetchQuiz(quizId));
  }, [quizId]);

  useEffect(() => {
    if (quizId && userId) {
      dispatch(fetchQuizSetAttempts({ quizSetId: quizId, userId }));
    }
  }, []);

  useEffect(() => {
    if (!quiz?.user_attempt?.attempted) {
      navigate("/", { replace: true });
    }
  }, [quiz?.user_attempt?.attempted]);

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
    <main className="w-full bg-background text-foreground min-h-screen">
      <div className="flex min-h-screen overflow-hidden">
        <Link to="/">
          <img src={WhiteLogo} className="max-h-11 fixed left-6 top-6 z-50" />
        </Link>
        <QuizResultInfo />

        <QuizAnsweredQuestions />
      </div>
    </main>
  );
}
