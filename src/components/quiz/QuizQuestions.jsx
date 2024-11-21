import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../hooks/useQuiz";
import {
  submitQuizAttempt,
  updateQuizAnswer,
} from "../../redux/features/quiz/quizSlice";

export default function QuizQuestions() {
  const navigate = useNavigate();
  const { quiz, quizAnswers, loading, error } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const dispatch = useDispatch();

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

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        No questions available
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion?.options) {
      if (quiz.questions.length > 1) {
        setShuffledOptions(
          [...currentQuestion.options].sort(() => Math.random() - 0.5)
        );
      } else {
        setShuffledOptions([...currentQuestion.options]);
      }

      const existingAnswer = quizAnswers[currentQuestion.id];
      setSelectedAnswer(existingAnswer || null);
    }
  }, [
    currentQuestionIndex,
    currentQuestion?.id,
    quizAnswers,
    quiz.questions.length,
  ]);

  const handleNext = () => {
    if (selectedAnswer) {
      dispatch(
        updateQuizAnswer({
          question_id: currentQuestion.id,
          answer: selectedAnswer,
        })
      );

      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);

    if (quiz.questions?.length === 1) {
      dispatch(
        updateQuizAnswer({
          question_id: currentQuestion.id,
          answer: answer,
        })
      );
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      dispatch(
        updateQuizAnswer({
          question_id: currentQuestion.id,
          answer: selectedAnswer,
        })
      );

      dispatch(submitQuizAttempt({ quizId: quiz?.id, answers: quizAnswers }));

      navigate(`/quiz/${quiz.id}/result`);
    }
  };

  return (
    <div className="lg:col-span-2 bg-white">
      <div className="bg-white p-6 !pb-2 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {shuffledOptions.map((option, index) => (
            <label
              key={index}
              className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg"
            >
              <input
                type="checkbox"
                name="answer"
                checked={selectedAnswer === option}
                onChange={() => handleAnswerSelect(option)}
                className="form-radio text-buzzr-purple"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-between my-8">
          {currentQuestionIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="w-1/3 text-center block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold"
            >
              Previous
            </button>
          )}
          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="w-1/3 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="w-1/3 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
