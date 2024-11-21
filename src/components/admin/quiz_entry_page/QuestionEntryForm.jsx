import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuizSetList } from "../../../hooks/useQuizSetList";
import {
  createQuizQuestion,
  resetQuestionSetToEdit,
  updateQuizQuestion,
} from "../../../redux/features/quizSetList/quizSetListSlice";
import Field from "../../common/Field";

export default function QuestionEntryForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from || "/admin/dashboard";
  const [selectedOption, setSelectedOption] = useState(null);
  const { quizSetList, entryPageQuizId, questionSetToEdit } = useQuizSetList();
  const quizSet = quizSetList.find((quizSet) => quizSet.id === entryPageQuizId);

  useEffect(() => {
    if (questionSetToEdit) {
      setValue("title", questionSetToEdit.question);
      setValue("optionText1", questionSetToEdit.options[0]);
      setValue("optionText2", questionSetToEdit.options[1]);
      setValue("optionText3", questionSetToEdit.options[2]);
      setValue("optionText4", questionSetToEdit.options[3]);
      setSelectedOption(questionSetToEdit.correctAnswer);
    }
  }, [questionSetToEdit]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
  } = useForm();

  const clearForm = () => {
    // Clear the form after successful submission
    setValue("title", "");
    setValue("optionText1", "");
    setValue("optionText2", "");
    setValue("optionText3", "");
    setValue("optionText4", "");
    setSelectedOption(null);
  };

  const handleCheckboxChange = (index) => {
    setSelectedOption(index);
    const optionFields = [
      "optionText1",
      "optionText2",
      "optionText3",
      "optionText4",
    ];
    const formValues = watch();
    setValue("correctAnswer", formValues[optionFields[index]]);
  };

  const submitForm = async (formData) => {
    // Check if a correct answer is selected
    if (selectedOption === null) {
      alert("Please select a correct answer");
      return;
    }

    const transformedData = {
      question: formData.title,
      options: [
        formData.optionText1,
        formData.optionText2,
        formData.optionText3,
        formData.optionText4,
      ],
      correctAnswer: formData.correctAnswer,
    };

    if (questionSetToEdit == null && quizSet?.status === "published") {
      alert("Cannot add question to a published quiz");
      clearForm();
      return;
    }

    if (questionSetToEdit) {
      await updateExistQuizQuestion({ questionSetToEdit, transformedData });
      dispatch(resetQuestionSetToEdit(null));
      return;
    }

    await createNewQuizQuestion({ entryPageQuizId, transformedData });
  };

  const createNewQuizQuestion = async ({
    entryPageQuizId,
    transformedData,
  }) => {
    try {
      await dispatch(
        createQuizQuestion({
          quizSetId: entryPageQuizId,
          questionSet: transformedData,
        })
      );

      clearForm();
    } catch (err) {
      console.error("Create Quiz Question failed:", err);

      setError("root", {
        type: "manual",
        random: {
          message: err.message,
        },
      });
    }
  };

  const updateExistQuizQuestion = async ({
    questionSetToEdit,
    transformedData,
  }) => {
    try {
      await dispatch(
        updateQuizQuestion({
          questionId: questionSetToEdit.id,
          questionSet: transformedData,
        })
      );

      clearForm();
    } catch (err) {
      console.error("Update Quiz Question failed:", err);

      setError("root", {
        type: "manual",
        random: {
          message: err.message,
        },
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>

      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <Field
            label="Question title"
            error={errors.title}
            className="block text-sm font-medium text-foreground mb-1"
          >
            <input
              {...register("title", {
                required: "Question title is required",
              })}
              type="text"
              id="title"
              name="title"
              className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
              placeholder="Enter question title"
            />
          </Field>
        </div>

        <p className="text-sm text-gray-600 mt-4">Add Options</p>

        <div id="optionsContainer" className="space-y-2 mt-4">
          <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
            <input
              type="checkbox"
              id="option1"
              checked={selectedOption === 0}
              onChange={() => handleCheckboxChange(0)}
              className="text-primary focus:ring-0 w-4 h-4"
            />
            <Field label="" error={errors.optionText1}>
              <input
                type="text"
                id="optionText1"
                {...register("optionText1", {
                  required: "Option 1 is required",
                })}
                className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                placeholder="Option 1"
              />
            </Field>
          </div>

          <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
            <input
              type="checkbox"
              id="option2"
              checked={selectedOption === 1}
              onChange={() => handleCheckboxChange(1)}
              className="text-primary focus:ring-0 w-4 h-4"
            />
            <Field label="" error={errors.optionText2}>
              <input
                type="text"
                id="optionText2"
                {...register("optionText2", {
                  required: "Option 2 is required",
                })}
                className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                placeholder="Option 2"
              />
            </Field>
          </div>

          <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
            <input
              type="checkbox"
              id="option3"
              checked={selectedOption === 2}
              onChange={() => handleCheckboxChange(2)}
              className="text-primary focus:ring-0 w-4 h-4"
            />
            <Field label="" error={errors.optionText3}>
              <input
                type="text"
                id="optionText3"
                {...register("optionText3", {
                  required: "Option 3 is required",
                })}
                className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                placeholder="Option 3"
              />
            </Field>
          </div>

          <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
            <input
              type="checkbox"
              id="option4"
              checked={selectedOption === 3}
              onChange={() => handleCheckboxChange(3)}
              className="text-primary focus:ring-0 w-4 h-4"
            />
            <Field label="" error={errors.optionText4}>
              <input
                type="text"
                id="optionText4"
                {...register("optionText4", {
                  required: "Option 4 is required",
                })}
                className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                placeholder="Option 4"
              />
            </Field>
          </div>
        </div>
        {!questionSetToEdit && (
          <button
            className="w-full bg-primary text-white text-primary-foreground p-2 mt-4 rounded-md hover:bg-primary/90 transition-colors"
            type="submit"
          >
            Add Question
          </button>
        )}
        {questionSetToEdit && (
          <div className="flex justify-between">
            <button
              className="w-full bg-primary text-white text-primary-foreground p-2 mt-4 rounded-md hover:bg-primary/90 transition-colors mr-2"
              type="submit"
            >
              Update Question
            </button>
            <button
              className="w-full bg-primary text-white text-primary-foreground p-2 mt-4 rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => {
                dispatch(resetQuestionSetToEdit(null));
                clearForm();
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
      <button
        className="w-full bg-primary text-white text-primary-foreground p-2 mt-4 rounded-md hover:bg-primary/90 transition-colors"
        onClick={() => navigate("/admin/dashboard")}
      >
        Save Quiz
      </button>
    </div>
  );
}
