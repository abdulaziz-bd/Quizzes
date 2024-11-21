import { useSelector } from "react-redux";
import { selectAuth } from "../redux/features/auth/authSlice";

export const useAuth = () => {
  const auth = useSelector(selectAuth);

  return {
    auth,
  };
};
