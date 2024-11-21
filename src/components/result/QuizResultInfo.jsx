import { Link, useParams } from "react-router-dom";
import { useQuizSet } from "../../hooks/useQuizSet";
import CircularProgress from "../common/CircleProgress";

export default function QuizResultInfo() {
  const { quizSetAttempts, quizSetStats, loading, error } = useQuizSet();
  const params = useParams();
  const quizSetId = params.quizId;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        Error: {error}
      </div>
    );
  }

  // Calculate percentage
  const percentage = quizSetStats.totalCorrectAnswers
    ? Math.round(
        (quizSetStats.totalCorrectAnswers / quizSetStats.totalQuestions) * 100
      )
    : 0;

  return (
    <div className="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
      <div>
        <div className="text-white">
          <div>
            <h2 className="text-4xl font-bold mb-2">
              {quizSetAttempts?.quiz?.title}
            </h2>
            <p>{quizSetAttempts?.quiz?.description} </p>
          </div>

          <div className="my-6 flex items-center  ">
            <div className="w-1/2">
              <div className="flex gap-6 my-6">
                <div>
                  <p className="font-semibold text-2xl my-0">
                    {quizSetStats.totalQuestions}
                  </p>
                  <p className="text-gray-300">Questions</p>
                </div>

                <div>
                  <p className="font-semibold text-2xl my-0">
                    {quizSetStats.totalCorrectAnswers}
                  </p>
                  <p className="text-gray-300">Correct</p>
                </div>

                <div>
                  <p className="font-semibold text-2xl my-0">
                    {quizSetStats.totalWrongAnswers}
                  </p>
                  <p className="text-gray-300">Wrong</p>
                </div>
              </div>

              <Link
                to={`/quiz/${quizSetId}/leaderboard`}
                className=" bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white"
              >
                View Leaderboard
              </Link>
            </div>

            <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
              <div className="flex-1">
                <p className="text-2xl font-bold">
                  {quizSetStats.totalCorrectAnswers}/
                  {quizSetStats.totalQuestions}
                </p>
                <p>Your Mark</p>
              </div>
              <div>
                <CircularProgress percentage={percentage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
