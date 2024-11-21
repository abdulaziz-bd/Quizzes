import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { PlusIcon } from "../../../assets/SVG";
import {
  resetEntryPageQuizId,
  resetQuizToUpdate,
} from "../../../redux/features/quizSetList/quizSetListSlice";

export default function CreateQuiz() {
  const dispatch = useDispatch();

  const handleResetEntryPageQuizId = async () => {
    await dispatch(resetEntryPageQuizId());
    await dispatch(resetQuizToUpdate());
  };

  return (
    <>
      <Link
        to="/admin/quiz-set-page"
        className="group"
        onClick={handleResetEntryPageQuizId}
      >
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 ">
          <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
            <PlusIcon />
          </div>
          <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
            Create a new quiz
          </h3>
          <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
            Build from the ground up
          </p>
        </div>
      </Link>
    </>
  );
}
