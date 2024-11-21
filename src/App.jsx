import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/admin/Dashboard";
import QuizSetEntryPage from "./pages/admin/QuizSetEntryPage";
import QuizSetPage from "./pages/admin/QuizSetPage";
import Home from "./pages/Home";
import LeaderboardPage from "./pages/LeaderboardPage";
import Login from "./pages/Login";
import QuizPage from "./pages/QuizPage";
import Register from "./pages/Register";
import ResultPage from "./pages/ResultPage";
import AdminRoutes from "./routes/AdminRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/quiz/:quizSetId" element={<QuizPage />} />
          <Route
            path="/quiz/:quizId/leaderboard"
            element={<LeaderboardPage />}
          />
          <Route path="/quiz/:quizId/result" element={<ResultPage />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/quiz-set-page" element={<QuizSetPage />} />
          <Route path="/admin/quiz-entry-page" element={<QuizSetEntryPage />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
