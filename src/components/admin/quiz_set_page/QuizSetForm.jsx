import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  createQuizSet,
  setEntryPageQuizId,
  updateQuizSet,
} from "../../../redux/features/quizSetList/quizSetListSlice";
import Field from "../../common/Field";

export default function QuizSetForm({ quizToUpdate }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      title: quizToUpdate?.title || "",
      description: quizToUpdate?.description || "",
    },
  });

  const handleNext = async () => {
    await dispatch(setEntryPageQuizId(quizToUpdate.id));

    navigate("/admin/quiz-entry-page", { replace: true });
  };

  const submitForm = async (formData) => {
    if (!quizToUpdate) {
      try {
        await dispatch(createQuizSet(formData)).unwrap();
        toast.success("Quiz added successfully and is in Draft mode!", {
          position: "top-right",
        });
        navigate("/admin/quiz-entry-page", { replace: true });
      } catch (err) {
        console.error("Create Quiz failed:", err);

        setError("root", {
          type: "manual",
          random: {
            message: err.message,
          },
        });
      }
    }

    if (quizToUpdate) {
      if (
        formData.title === quizToUpdate.title &&
        formData.description === quizToUpdate.description
      ) {
        toast.warning("No changes made to the quiz set", {
          position: "top-right",
        });
        return;
      }

      try {
        await dispatch(
          updateQuizSet({
            id: quizToUpdate.id,
            title: formData.title,
            description: formData.description,
            status: quizToUpdate.status,
          })
        );
        toast.success("Quiz updated successfully!", {
          position: "top-right",
        });
        navigate("/admin/quiz-entry-page", { replace: true });
      } catch (err) {
        console.error("Update Quiz failed:", err);

        setError("root", {
          type: "manual",
          random: {
            message: err.message,
          },
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="mb-4">
        <Field label="Quiz title" error={errors.title}>
          <input
            {...register("title", {
              required: "Quiz title is required",
            })}
            type="text"
            id="title"
            name="title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
            placeholder="Quiz"
          />
        </Field>
      </div>

      <div className="mb-6">
        <Field label="Description (Optional)" error={errors.description}>
          <textarea
            {...register("description")}
            id="description"
            name="description"
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
            placeholder="Description"
          ></textarea>
        </Field>
      </div>

      {quizToUpdate && (
        <button
          type="submit"
          className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-4"
        >
          Update Quiz
        </button>
      )}

      {quizToUpdate ? (
        <a
          onClick={handleNext}
          className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
        >
          Next
        </a>
      ) : (
        <button
          className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          type="submit"
        >
          Next
        </button>
      )}
    </form>
  );
}
