import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAuthenticated } from "../features/auth/authSlice";

const HomeNav = () => {
  const isAuthenticated = useSelector(selectAuthenticated);
  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="/FitBuddyLogo.jpeg"
                alt="FitBuddy"
              />
            </div>
            <Link to="/" className="text-white ml-4">
              Home
            </Link>
          </div>
          <div className="hidden sm:block">
            <div className="flex space-x-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-white">
                    Dashboard
                  </Link>
                  <Link to="/logout" className="text-white">
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-white">
                    Login
                  </Link>
                  <Link to="/register" className="text-white">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;
