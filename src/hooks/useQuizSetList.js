import { useSelector } from "react-redux";
import {
  selectEntryPageQuizId,
  selectQuestionSetToEdit,
  selectQuizSetList,
  selectQuizSetListError,
  selectQuizSetListLoading,
  selectQuizToUpdate,
} from "../redux/features/quizSetList/quizSetListSlice";

export const useQuizSetList = () => {
  const quizSetList = useSelector(selectQuizSetList);
  const entryPageQuizId = useSelector(selectEntryPageQuizId);
  const questionSetToEdit = useSelector(selectQuestionSetToEdit);
  const quizToUpdate = useSelector(selectQuizToUpdate);
  const loading = useSelector(selectQuizSetListLoading);
  const error = useSelector(selectQuizSetListError);

  return {
    quizSetList,
    entryPageQuizId,
    questionSetToEdit,
    quizToUpdate,
    loading,
    error,
  };
};
