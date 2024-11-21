import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DummyAvatar from "../../assets/avater.webp";
import LogoWhite from "../../assets/logo-white.svg";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../redux/features/auth/authSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleLogOut = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-primary p-6 flex flex-col">
      <div className="mb-10">
        <img src={LogoWhite} className="h-7" />
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/dashboard"
              className="block py-2 px-4 rounded-lg bg-buzzr-purple bg-white text-primary font-bold"
            >
              Quizzes
            </Link>
          </li>

          <li>
            <a
              href="#"
              className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
            >
              Settings
            </a>
          </li>

          <li>
            <a
              href="#"
              className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
            >
              Manage Users
            </a>
          </li>

          <li>
            <a
              href="#"
              className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
            >
              Manage Roles
            </a>
          </li>

          <li>
            <button
              className="w-full text-left block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <div className="mt-auto flex items-center">
        <img
          src={DummyAvatar}
          alt="Mr Hasan"
          className="w-10 h-10 rounded-full mr-3 object-cover"
        />
        <span className="text-white font-semibold">
          {auth?.user?.full_name}
        </span>
      </div>
    </aside>
  );
}
