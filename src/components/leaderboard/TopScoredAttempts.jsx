import React from "react";
import DummyImage from "../../assets/avater.webp";
import { useAuth } from "../../hooks/useAuth";
import { rankPosition } from "../../utils";



export default function TopScoredAttempts({ results }) {
  const { auth } = useAuth();
  const topFiveScoredAttempts = results
    ?.sort((a, b) => {
      const aHighestScore = Math.max(
        ...a.attempts.map((attempt) => attempt.results.totalMarks)
      );
      const bHighestScore = Math.max(
        ...b.attempts.map((attempt) => attempt.results.totalMarks)
      );
      return bHighestScore - aHighestScore;
    })
    .slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <p className="mb-6">{results[0]?.quizTitle}</p>
      <ul className="space-y-4">
        {topFiveScoredAttempts.map((result, index) => (
          <li
            key={result.studentId}
            className={`flex items-center justify-between ${
              result.studentId === auth?.user?.id &&
              "bg-primary p-2 rounded-[10px] text-white"
            }`}
          >
            <div className="flex items-center">
              <img
                src={DummyImage}
                alt={result.studentName}
                className="object-cover w-10 h-10 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold">{result.studentName}</h3>
                <p className="text-sm text-gray-500">
                  {index + 1}
                  {rankPosition(index + 1)}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-2">
                {result.attempts[0]?.results?.totalMarks}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
