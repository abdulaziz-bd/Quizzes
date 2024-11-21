import { useEffect, useState } from "react";
import { useQuizSet } from "./useQuizSet";

const useQuizResults = () => {
  const { quizSetAttempts } = useQuizSet();
  const [studentResults, setStudentResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const calculateStudentResults = async () => {
      try {
        if (!quizSetAttempts?.attempts) {
          setIsLoading(false);
          return;
        }

        const studentsAttempts = quizSetAttempts.attempts.reduce(
          (acc, attempt) => {
            const studentId = attempt.user.id;

            if (!acc[studentId]) {
              acc[studentId] = {
                studentId,
                studentName: attempt.user.full_name,
                studentEmail: attempt.user.email,
                quizTitle: quizSetAttempts.quiz.title,
                attempts: [],
              };
            }

            const attemptResult = {
              attemptId: attempt.id,
              timestamp: attempt.timestamp,
              results: attempt.correct_answers.reduce(
                (totals, correctAnswer) => {
                  const submittedAnswer = attempt.submitted_answers.find(
                    (answer) => answer.question_id === correctAnswer.question_id
                  );

                  if (
                    submittedAnswer &&
                    submittedAnswer.answer === correctAnswer.answer
                  ) {
                    totals.totalCorrectAnswers += 1;
                    totals.totalMarks += correctAnswer.marks;
                  }

                  return totals;
                },
                {
                  totalQuestions: attempt.submitted_answers.length,
                  totalMarks: 0,
                  totalCorrectAnswers: 0,
                  totalWrongAnswers: 0,
                }
              ),
            };

            // Calculate wrong answers after processing all correct ones
            attemptResult.results.totalWrongAnswers =
              attemptResult.results.totalQuestions -
              attemptResult.results.totalCorrectAnswers;

            acc[studentId].attempts.push(attemptResult);
            return acc;
          },
          {}
        );

        setStudentResults(Object.values(studentsAttempts));
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    calculateStudentResults();
  }, [quizSetAttempts]);

  return { studentResults, loading: isLoading, error };
};

export default useQuizResults;
