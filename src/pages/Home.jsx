import { Navigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import QuizList from "../components/home_quiz/QuizList";
import WelcomeSection from "../components/home_quiz/WelcomeSection";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export default function Home() {
  const { auth } = useAuth();

  useEffect(() => {
    document.title = "Quizzes";
  }, []);

  if (auth?.user?.role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="container mx-auto py-3">
      <Header />

      {auth?.isAuthenticated && <WelcomeSection />}

      <main className="bg-white p-6 rounded-md h-full">
        <QuizList />
      </main>

      <Footer />
    </div>
  );
}
