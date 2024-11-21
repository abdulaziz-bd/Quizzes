import { useEffect } from "react";
import { Link } from "react-router-dom";
import { LeftArrow } from "../../assets/SVG";
import QuizSetForm from "../../components/admin/quiz_set_page/QuizSetForm";
import { useQuizSetList } from "../../hooks/useQuizSetList";

export default function QuizSetPage() {
  const { quizToUpdate } = useQuizSetList();
  useEffect(() => {
    document.title = "Quizzes-Create Quiz";
  }, []);

  return (
    <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-buzzr-purple"
          >
            <LeftArrow />
            Back to home
          </Link>

          <h2 className="text-3xl font-bold mb-6">
            {quizToUpdate ? "Update" : "Give"} your quiz title and description
          </h2>

          <QuizSetForm quizToUpdate={quizToUpdate} />
        </div>
      </div>
    </main>
  );
}
