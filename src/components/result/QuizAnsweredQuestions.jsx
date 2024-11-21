import React from "react";
import { useQuiz } from "../../hooks/useQuiz";
import { useQuizSet } from "../../hooks/useQuizSet";

export default function QuizAnsweredQuestions() {
  const { quizSetAttempts, loading, error } = useQuizSet();
  const { quiz, loading: quizLoading, error: quizError } = useQuiz();

  const quizAttempt = quizSetAttempts?.attempts?.find(
    (attempt) => attempt.id === quiz.user_attempt?.attempt_id
  );

  if (loading || quizLoading) return <div>Loading...</div>;
  if (error || quizError) return <div>Error: {error || quizError}</div>;

  return (
    <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
      <div className="h-[calc(100vh-50px)] overflow-y-scroll ">
        {!loading && !quizLoading && (
          <div className="px-4">
            {quiz?.questions?.map((question, index) => {
              const userAnswer = quizAttempt?.submitted_answers?.find(
                (answer) => answer.question_id === question.id
              )?.answer;

              const correctAnswer = quizAttempt?.correct_answers?.find(
                (answer) => answer.question_id === question.id
              )?.answer;

              const isCorrect = userAnswer === correctAnswer;

              return (
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
                      {question.options.map((option) => (
                        <label
                          key={option}
                          className={`flex items-center space-x-3 p-2 rounded ${
                            option === correctAnswer
                              ? "bg-green-100"
                              : option === userAnswer && !isCorrect
                              ? "bg-red-100"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question_${question.id}`}
                            className="form-radio text-buzzr-purple"
                            checked={option === userAnswer}
                            readOnly
                          />
                          <span className="flex-1">{option}</span>
                          {option === correctAnswer && (
                            <span className="text-green-600 text-sm">
                              ✓ Correct Answer
                            </span>
                          )}
                          {option === userAnswer && !isCorrect && (
                            <span className="text-red-600 text-sm">
                              ✗ Your Answer
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="bg-primary/10 px-6 py-2">
                    <div
                      className={`font-medium ${
                        isCorrect ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isCorrect
                        ? "Correctly answered!"
                        : "Incorrectly answered"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
