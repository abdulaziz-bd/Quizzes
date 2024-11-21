import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../api";

// Thunk
export const fetchQuizSetList = createAsyncThunk(
  "quizSetList/fetchQuizSetList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes`
      );

      // console.log("QuizSetList: ", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateQuizSet = createAsyncThunk(
  "quizSetList/updateQuizSet",
  async (quizSet, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes/${quizSet.id}`,
        {
          title: quizSet.title,
          description: quizSet.description,
          status: quizSet.status,
        }
      );

      // console.log("Updated Quiz Set: ", response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createQuizSet = createAsyncThunk(
  "quizSetList/createQuizSet",
  async (quiz_details, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes/`,
        quiz_details
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createQuizQuestion = createAsyncThunk(
  "quizSetList/createQuizQuestion",
  async ({ quizSetId, questionSet }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/admin/quizzes/${quizSetId}/questions`,
        questionSet
      );

      // console.log("Create Quiz Question: ", response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateQuizQuestion = createAsyncThunk(
  "quizSetList/updateQuizQuestion",
  async ({ questionId, questionSet }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/questions/${questionId}`,
        questionSet
      );

      // console.log("Updated Quiz Question: ", response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteQuizQuestion = createAsyncThunk(
  "quizSetList/deleteQuizQuestion",
  async ({ quizId, questionId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/questions/${questionId}`
      );

      // console.log("Deleted Quiz Question Index: ", response.data.data);
      return { quizId, questionId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  quizSetList: [],
  entryPageQuizId: null,
  questionSetToEdit: null,
  quizToUpdate: null,
  isLoading: false,
  error: null,
};

// Slice
const quizSetListSlice = createSlice({
  name: "quizSetList",
  initialState,
  reducers: {
    setEntryPageQuizId(state, action) {
      state.entryPageQuizId = action.payload;
    },
    resetEntryPageQuizId(state) {
      state.entryPageQuizId = null;
    },
    setQuestionSetToEdit(state, action) {
      state.questionSetToEdit = action.payload;
    },
    resetQuestionSetToEdit(state) {
      state.questionSetToEdit = null;
    },
    setQuizToUpdate(state, action) {
      state.quizToUpdate = action.payload;
    },
    resetQuizToUpdate(state) {
      state.quizToUpdate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizSetList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuizSetList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quizSetList = action.payload;
        state.entryPageQuizId = null;
        state.error = null;
      })
      .addCase(fetchQuizSetList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createQuizSet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createQuizSet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quizSetList = [...state.quizSetList, action.payload];
        state.entryPageQuizId = action.payload.id;
        state.error = null;
      })
      .addCase(createQuizSet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createQuizQuestion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createQuizQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quizSetList = state.quizSetList.map((quiz) => {
          if (quiz.id === action.payload.quizId) {
            quiz.Questions = [...quiz.Questions, action.payload];
          }
          return quiz;
        });
        state.error = null;
      })
      .addCase(createQuizQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateQuizQuestion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateQuizQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quizSetList = state.quizSetList.map((quiz) => {
          if (quiz.id === action.payload.quizId) {
            quiz.Questions = quiz.Questions.map((question) => {
              if (question.id === action.payload.id) {
                return action.payload;
              }
              return question;
            });
          }
          return quiz;
        });
        state.error = null;
      })
      .addCase(updateQuizQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteQuizQuestion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteQuizQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quizSetList = state.quizSetList.map((quiz) => {
          if (quiz.id === action.payload.quizId) {
            // console.log("quizId: ", quiz.id);
            quiz.Questions = quiz.Questions.filter(
              (question) => question.id !== action.payload.questionId
            );
            // console.log("Questions: ", quiz.Questions);
          }
          return quiz;
        });
        state.error = null;
      })
      .addCase(deleteQuizQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateQuizSet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateQuizSet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quizSetList = state.quizSetList.map((quiz) => {
          if (quiz.id === action.payload.id) {
            return {
              ...quiz,
              title: action.payload.title,
              description: action.payload.description,
              status: action.payload.status,
            };
          }
          return quiz;
        });
        state.error = null;
      })
      .addCase(updateQuizSet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Actions
export const {
  setEntryPageQuizId,
  resetEntryPageQuizId,
  setQuestionSetToEdit,
  resetQuestionSetToEdit,
  setQuizToUpdate,
  resetQuizToUpdate,
} = quizSetListSlice.actions;

// Reducer
export default quizSetListSlice.reducer;

// Selectors
export const selectQuizSetList = (state) => state.quizSetList.quizSetList;
export const selectEntryPageQuizId = (state) =>
  state.quizSetList.entryPageQuizId;
export const selectQuestionSetToEdit = (state) =>
  state.quizSetList.questionSetToEdit;
export const selectQuizToUpdate = (state) => state.quizSetList.quizToUpdate;
export const selectQuizSetListLoading = (state) => state.quizSetList.isLoading;
export const selectQuizSetListError = (state) => state.quizSetList.error;
