import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TempImg from "../../assets/backgrounds/2.jpg";
import { fontJaro } from "../../utils";

export default function QuizCard({ quiz }) {
  const navigate = useNavigate();

  const handleLeaderboard = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/quiz/${quiz.id}/leaderboard`);
  };

  return (
    <Link
      to={quiz?.is_attempted ? `/quiz/${quiz.id}/result` : `/quiz/${quiz.id}`}
      className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer"
    >
      <div className="group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
        <h1 className=" text-5xl" style={fontJaro}>
          {quiz?.title || "No title available"}
        </h1>
        <p className="mt-2 text-lg">
          {quiz?.description || "No description available"}
        </p>
      </div>
      {quiz?.is_attempted && (
        <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
          <div>
            <h1 className="text-3xl font-bold text-center">
              Already Participated
            </h1>
            <p
              className="text-center hover:underline cursor-pointer"
              onClick={(e) => handleLeaderboard(e)}
            >
              Click to view your leaderboard
            </p>
          </div>
        </div>
      )}
      <img
        src={quiz?.thumbnail || TempImg}
        alt="JavaScript Hoisting"
        className="w-full h-full object-cover rounded mb-4"
      />
    </Link>
  );
}
