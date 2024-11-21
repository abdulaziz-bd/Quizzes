import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { fontJaro } from "../../utils";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <button
      className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
      style={fontJaro}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
