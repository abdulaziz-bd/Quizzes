import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { auth, loading, error } = useAuth();
  const location = useLocation();

  if (auth?.user?.role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  }

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (location.pathname.includes("/result")) {
    return <Outlet />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error?.message || error}</div>;
  }

  const isLeaderboard = location.pathname.includes("/leaderboard");

  const isQuiz = location.pathname.includes("/quiz/");

  if (isQuiz && !isLeaderboard) {
    return (
      <>
        <div className="container mx-auto py-3">
          {!isLeaderboard && <Header />}
          <Outlet />
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      {isLeaderboard && (
        <div className="p-4">
          <Header />
        </div>
      )}
      <main className="mx-auto max-w-[1020px] py-8">
        <div className="container mx-auto py-3">
          {!isLeaderboard && <Header />}
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivateRoutes;
