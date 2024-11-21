import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../api";

const calculateStats = (attempt) => {
  let totalMarks = 0;
  let totalCorrectAnswers = 0;

  attempt.correct_answers.forEach((correctAnswer) => {
    const submittedAnswer = attempt.submitted_answers.find(
      (answer) => answer.question_id === correctAnswer.question_id
    );

    if (submittedAnswer && submittedAnswer.answer === correctAnswer.answer) {
      totalCorrectAnswers += 1;
      totalMarks += correctAnswer.marks;
    }
  });

  let totalWrongAnswers =
    attempt.submitted_answers.length - totalCorrectAnswers;

  return {
    totalQuestions: attempt.submitted_answers.length,
    totalMarks,
    totalCorrectAnswers,
    totalWrongAnswers,
  };
};

// Thunk
export const fetchQuizSets = createAsyncThunk(
  "quizSet/fetchQuizSets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes?status=published`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchQuizSetAttempts = createAsyncThunk(
  "quizSet/fetchQuizSetAttempts",
  async ({ quizSetId, userId }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizSetId}/attempts`
      );

      return { data: response.data.data, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  quizSets: [],
  quizSetAttempts: {},
  quizSetStats: {},
  isLoading: false,
  error: null,
};

// Slice
const quizSetSlice = createSlice({
  name: "quizSet",
  initialState,
  reducers: {
    resetQuizSetState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizSets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuizSets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quizSets = action.payload;
        state.error = null;
      })
      .addCase(fetchQuizSets.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "An error occurred";
      })
      .addCase(fetchQuizSetAttempts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuizSetAttempts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quizSetAttempts = action.payload.data;

        const userId = action.payload.userId;

        if (action.payload?.data?.attempts?.length > 0) {
          const userAttempt = action.payload.data.attempts.find(
            (attempt) => attempt?.user?.id === userId
          );

          if (userAttempt) {
            state.quizSetStats = calculateStats(userAttempt);
          }
        }

        state.error = null;
      })
      .addCase(fetchQuizSetAttempts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

// Actions
export const { resetQuizSetState } = quizSetSlice.actions;

// Reducer
export default quizSetSlice.reducer;

// Selectors
export const selectQuizSets = (state) => state.quizSet.quizSets;
export const selectQuizSetStats = (state) => state.quizSet.quizSetStats;
export const selectQuizSetAttempts = (state) => state.quizSet.quizSetAttempts;
export const selectQuizSetLoading = (state) => state.quizSet.isLoading;
export const selectQuizSetError = (state) => state.quizSet.error;
