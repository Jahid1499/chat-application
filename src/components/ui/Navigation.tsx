import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logoImage from "../../assets/images/lws-logo-dark.svg";
import { userLoggedOut } from "../../features/auth/authSlice";

export default function Navigation() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };

  return (
    <nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16 items-center">
          <Link to="/">
            <img className="h-10" src={logoImage} alt="Learn with Summit" />
          </Link>

          <button onClick={logout}>
            <span className="flex items-center mx-4 h-6 px-6 py-4 text-sm font-semibold text-indigo-700 hover:bg-indigo-200 bg-white rounded-full">
              Logout
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
