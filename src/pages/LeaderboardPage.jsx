import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TopScoredAttempts from "../components/leaderboard/TopScoredAttempts";
import UserDetails from "../components/leaderboard/UserDetails";
import { useAuth } from "../hooks/useAuth";
import useQuizResults from "../hooks/useQuizResults";
import { fetchQuiz } from "../redux/features/quiz/quizSlice";
import { fetchQuizSetAttempts } from "../redux/features/quizSet/quizSetSlice";

export default function LeaderboardPage() {
  const { auth } = useAuth();
  const params = useParams();
  const quizId = params.quizId;
  const dispatch = useDispatch();
  const { studentResults } = useQuizResults();
  const { quiz, loading, error } = useQuizResults();

  useEffect(() => {
    document.title = "Leaderboard";
  }, []);

  useEffect(() => {
    if (quizId) {
      dispatch(
        fetchQuizSetAttempts({ quizSetId: quizId, userId: auth?.user?.id })
      );
    }
  }, [quizId, auth?.user?.id]);

  useEffect(() => {
    dispatch(fetchQuiz(quizId));
  }, [quizId]);

  useEffect(() => {
    if (quiz?.user_attempt?.attempted) {
      navigate("/", { replace: true });
    }
  }, [quiz?.user_attempt?.attempted]);

  const myPosition = studentResults?.findIndex(
    (result) => result.studentId === auth?.user?.id
  );

  const myDetails = studentResults?.find(
    (result) => result.studentId === auth?.user?.id
  );

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
    <main className="min-h-[calc(100vh-50px)] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <UserDetails index={myPosition} details={myDetails} />

          <TopScoredAttempts results={studentResults} />
        </div>
      </div>
    </main>
  );
}