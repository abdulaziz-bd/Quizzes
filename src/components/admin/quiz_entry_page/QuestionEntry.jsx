import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateQuizSet } from "../../../redux/features/quizSetList/quizSetListSlice";
import QuestionEntryForm from "./QuestionEntryForm";

export default function QuestionEntry({ quizSet }) {
  const dispatch = useDispatch();

  const handleStatus = (status) => {
    if (status === "published") {
      if (quizSet?.Questions?.length < 1) {
        toast.error(
          "Please add at least one question to publish the quiz set",
          {
            position: "top-right",
          }
        );
        return;
      }
      if (quizSet?.status === "published") {
        toast.warning("Quiz set is already published", {
          position: "top-right",
        });
        return;
      }

      dispatch(updateQuizSet({ ...quizSet, status: "published" }));
    }

    if (status === "draft") {
      if (quizSet?.status === "draft") {
        toast.warning("Quiz set is already in draft mode", {
          position: "top-right",
        });
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
            className="bg-primary text-white text-primary-foreground p-2 mt-4 rounded-md hover:bg-primary/90 transition-colors text-xl"
            onClick={() => handleStatus("draft")}
          >
            UnPublish
          </button>
        ) : (
          <button
            className="bg-primary text-white text-primary-foreground px-6 py-2 mt-4 rounded-md hover:bg-primary/90 transition-colors text-xl"
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
