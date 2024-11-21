import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import quizReducer from "./features/quiz/quizSlice";
import quizSetReducer from "./features/quizSet/quizSetSlice";
import quizSetListReducer from "./features/quizSetList/quizSetListSlice";
import { setupAuthInterceptors } from "./middleware/setupAuthInterceptors";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quizSet: quizSetReducer,
    quiz: quizReducer,
    quizSetList: quizSetListReducer,
  },
});

setupAuthInterceptors(store);

export default store;
