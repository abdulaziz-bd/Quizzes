import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { useAuth } from "../../hooks/useAuth";
import { fontJaro } from "../../utils";
import Logout from "../auth/Logout";

export default function Header() {
  const { auth } = useAuth();
  return (
    <header className="flex justify-between items-center mb-12">
      <Link to={"/"}>
        <img src={Logo} className="h-7" />
      </Link>
      <div>
        {!auth?.isAuthenticated && (
          <Link
            className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
            style={fontJaro}
            to="/login"
          >
            Login
          </Link>
        )}

        {auth?.isAuthenticated && <Logout />}
      </div>
    </header>
  );
}
