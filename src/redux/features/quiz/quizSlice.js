import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../api";

// Thunk
export const fetchQuiz = createAsyncThunk(
  "quiz/fetchQuiz",
  async (quizId, { rejectWithValue }) => {
    try {
      // console.log("QuizId: ", quizId);
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizId}`
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitQuizAttempt = createAsyncThunk(
  "quiz/submitQuizAttempt",
  async ({ quizId, answers }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizId}/attempt`,
        { answers: { ...answers } }
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  quiz: {},
  quizAnswers: {},
  quizAttempt: {},
  isLoading: false,
  error: null,
};

// Slice
const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    resetQuizState: (state) => {
      return initialState;
    },
    updateQuizAnswer: (state, action) => {
      const { question_id, answer } = action.payload;
      state.quizAnswers = {
        ...state.quizAnswers,
        [question_id]: answer,
      };
    },
    resetQuizAnswers: (state) => {
      state.quizAnswers = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuiz.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quiz = action.payload;
        state.error = null;
      })
      .addCase(fetchQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(submitQuizAttempt.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitQuizAttempt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quizAttempt = { ...state.quizAttempt, ...action.payload };
        state.error = null;
      })
      .addCase(submitQuizAttempt.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

// Actions
export const { resetQuizState, updateQuizAnswer, resetQuizAnswers } =
  quizSlice.actions;

// Reducer
export default quizSlice.reducer;

// Selectors
export const selectQuiz = (state) => state.quiz.quiz;
export const selectQuizAnswers = (state) => state.quiz.quizAnswers;
export const selectQuizLoading = (state) => state.quiz.isLoading;
export const selectQuizError = (state) => state.quiz.error;
