import { useDispatch } from "react-redux";
import QuestionEntryForm from "./QuestionEntryForm";
import { updateQuizSet } from "../../../redux/features/quizSetList/quizSetListSlice";

export default function QuestionEntry({ quizSet }) {
  const dispatch = useDispatch();

  const handleStatus = (status) => {
    if (status === "published") {
      if (quizSet?.Questions?.length < 1) {
        alert("Please add at least one question to publish the quiz set");
        return;
      }
      if (quizSet?.status === "published") {
        alert("Quiz set is already published");
        return;
      }

      dispatch(updateQuizSet({ ...quizSet, status: "published" }));
    }

    if (status === "draft") {
      if (quizSet?.status === "draft") {
        alert("Quiz set is already in draft mode");
        return;
      }

      dispatch(updateQuizSet({ ...quizSet, status: "draft" }));
    }
  };

  return (
    <div className="">
      <div className="flex w-full justify-between">
        <h2 className="text-3xl font-bold mb-4">{quizSet?.title}</h2>
        {quizSet.status === "published" ? (
          <button
            className="rounded-[50px] px-6 py-1 text-white text-2xl round bg-green-700"
            onClick={() => handleStatus("draft")}
          >
            UnPublish
          </button>
        ) : (
          <button
            className="rounded-[50px] px-6 py-1 text-white text-2xl round bg-green-700"
            onClick={() => handleStatus("published")}
          >
            Publish
          </button>
        )}
      </div>
      <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
        Total number of questions :{" "}
        {quizSet?.Questions?.length > 0 ? quizSet?.Questions?.length : 0}
      </div>
      <p className="text-gray-600 mb-4">{quizSet?.description}</p>

      <QuestionEntryForm />
    </div>
  );
}
