import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authServices from "../services/authServices";
import { logoutSuccess } from "../features/auth/authSlice";

const clearCookie = (name) => {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
};

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await authServices.logout();
        clearCookie("token");
        dispatch(logoutSuccess());

        navigate("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    logoutUser();
  }, [navigate, dispatch]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Logging Out...
        </h2>
      </div>
    </div>
  );
};

export default Logout;
