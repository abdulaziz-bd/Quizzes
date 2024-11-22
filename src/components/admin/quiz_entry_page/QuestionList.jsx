import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteQuizQuestion,
  setQuestionSetToEdit,
} from "../../../redux/features/quizSetList/quizSetListSlice";

export default function QuestionList({ quizSet }) {
  const dispatch = useDispatch();

  const handleSetQuestionToEdit = (question) => {
    dispatch(setQuestionSetToEdit(question));
  };

  const handleDelete = ({ quizId, questionId }) => {
    if (quizSet.status === "published") {
      toast.error("Cannot delete question from a published quiz", {
        position: "top-right",
      });
      return;
    }

    if (window.confirm("Are you sure you want to delete this question?")) {
      dispatch(deleteQuizQuestion({ quizId, questionId }));
    }
  };

  return (
    <>
      {quizSet?.Questions?.length > 0 ? (
        <div className="px-4">
          {quizSet?.Questions?.map((question, index) => (
            <div
              key={question.id}
              className="rounded-lg overflow-hidden shadow-sm mb-4"
            >
              <div className="bg-white p-6 !pb-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {index + 1}. {question.question}
                  </h3>
                </div>
                <div className="space-y-2">
                  {question?.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className="flex items-center space-x-3 pointer-events-none"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        className="form-radio text-buzzr-purple"
                        checked={question.correctAnswer === option}
                        readOnly
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4 bg-primary/10 px-6 py-2">
                <button
                  className="text-red-600 hover:text-red-800 font-medium"
                  onClick={() =>
                    handleDelete({
                      quizId: question.quizId,
                      questionId: question.id,
                    })
                  }
                >
                  Delete
                </button>
                <button
                  className="text-primary hover:text-primary/80 font-medium"
                  onClick={() => handleSetQuestionToEdit(question)}
                >
                  Edit Question
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 px-4">
          No questions available
        </div>
      )}
    </>
  );
}
