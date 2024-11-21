import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "../pages/admin/Sidebar";

const AdminRoutes = () => {
  const { auth, loading, error } = useAuth();

  if (auth?.user?.role === "user") {
    return <Navigate to="/" />;
  }

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error?.message || error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AdminRoutes;
