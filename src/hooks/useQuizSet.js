import { useSelector } from "react-redux";
import {
  selectQuizSetAttempts,
  selectQuizSetError,
  selectQuizSetLoading,
  selectQuizSets,
  selectQuizSetStats,
} from "../redux/features/quizSet/quizSetSlice";

export const useQuizSet = () => {
  const quizzes = useSelector(selectQuizSets);
  const quizSetAttempts = useSelector(selectQuizSetAttempts);
  const quizSetStats = useSelector(selectQuizSetStats);
  const loading = useSelector(selectQuizSetLoading);
  const error = useSelector(selectQuizSetError);

  return {
    quizzes,
    quizSetAttempts,
    quizSetStats,
    loading,
    error,
  };
};
