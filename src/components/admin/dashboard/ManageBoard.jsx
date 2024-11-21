import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { QuizSvg } from "../../../assets/SVG";
import { useQuizSetList } from "../../../hooks/useQuizSetList";
import { setQuizToUpdate } from "../../../redux/features/quizSetList/quizSetListSlice";
import BoardHeader from "./BoardHeader";
import CreateQuiz from "./CreateQuiz";

export default function ManageBoard() {
  const { quizSetList } = useQuizSetList();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuizSetClick = async (quiz) => {
    await dispatch(setQuizToUpdate(quiz));

    navigate("/admin/quiz-set-page");
  };

  return (
    <main className="flex-grow p-10">
      <BoardHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CreateQuiz />

        {quizSetList?.map((quizSet) => (
          <div
            key={quizSet.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer"
            onClick={() => handleQuizSetClick(quizSet)}
          >
            <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
              <QuizSvg />
            </div>
            <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
              {quizSet.title}
            </h3>
            <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
              {quizSet.description.slice(0, 50)} ...
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
