import { useSelector } from "react-redux";
import {
  selectQuiz,
  selectQuizAnswers,
  selectQuizError,
  selectQuizLoading,
} from "../redux/features/quiz/quizSlice";

export const useQuiz = () => {
  const quiz = useSelector(selectQuiz);
  const quizAnswers = useSelector(selectQuizAnswers);
  const loading = useSelector(selectQuizLoading);
  const error = useSelector(selectQuizError);

  return {
    quiz,
    quizAnswers,
    loading,
    error,
  };
};
