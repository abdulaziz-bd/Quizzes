import React from "react";
import DummyImage from "../../assets/avater.webp";
import { rankPosition } from "../../utils";

export default function UserDetails({ index, details }) {
  return (
    <div className="bg-primary rounded-lg p-6 text-white">
      <div className="flex flex-col items-center mb-6">
        <img
          src={DummyImage}
          alt="Profile Pic"
          className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover"
        />
        <h2 className="text-2xl font-bold">{details?.studentName}</h2>
        <p className="text-xl">{index + 1 + rankPosition(index + 1)} Position</p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-sm opacity-75">Mark</p>
          <p className="text-2xl font-bold">
            {details?.attempts[0]?.results?.totalMarks}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm opacity-75">Correct</p>
          <p className="text-2xl font-bold">
            {details?.attempts[0]?.results?.totalCorrectAnswers}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm opacity-75">Wrong</p>
          <p className="text-2xl font-bold">
            {details?.attempts[0]?.results?.totalWrongAnswers}
          </p>
        </div>
      </div>
    </div>
  );
}
