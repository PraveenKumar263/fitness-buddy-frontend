import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomeNav from "./wrappers/HomeNav";
import Register from "./components/Register";
import Login from "./components/Login";
import Forgot from "./components/Forgot";
import Reset from "./components/Reset";
import Logout from "./components/Logout";
import Dashboard from "./components/Dashboard";
import Activate from "./components/Activate";
import Classes from "./components/Classes";
import ClassDetails from "./components/ClassDetails";
import Bookings from "./components/Bookings";
import BookingDetails from "./components/BookingDetails";
import Feedback from "./components/Feedback";
import MyClasses from "./components/MyClasses";
import CreateClass from "./components/CreateClass";
import userLoader from "./loaders/userLoader";
import Home from "./pages/Home";
import { loginSuccess, selectAuthenticated } from "./features/auth/authSlice";
import TrainerProfile from "./components/TrainerProfile";
import { useEffect } from "react";
import authServices from "./services/authServices";
import UserProfile from "./components/UserProfile";
import Footer from "./wrappers/Footer";

const Layout = () => {
  return (
    <>
      <HomeNav />
      <main className="p-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "activate",
        element: <Activate />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot",
        element: <Forgot />,
      },
      {
        path: "reset",
        element: <Reset />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "/trainers/:trainerId",
        element: <TrainerProfile />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Outlet />
          </PrivateRoute>
        ),
        loader: userLoader,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "classes",
            element: <Classes />,
          },
          {
            path: "classes/:classId",
            element: <ClassDetails />,
          },
          {
            path: "my-classes",
            element: <MyClasses />,
          },
          {
            path: "create-class",
            element: <CreateClass />,
          },
          {
            path: "bookings",
            element: <Bookings />,
          },
          {
            path: "bookings/:bookingId",
            element: <BookingDetails />,
          },
          {
            path: "feedback",
            element: <Feedback />,
          },
          {
            path: "profile",
            element: <UserProfile />,
          },
        ],
      },
    ],
  },
]);

const checkUserAuthentication = async () => {
  try {
    const response = await authServices.checkAuth();
    return response.data?.userId ? true : false;
  } catch (error) {
    return false;
  }
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAuthentication = async () => {
      const isAuthenticated = await checkUserAuthentication();
      if (isAuthenticated) {
        dispatch(loginSuccess());
      }
    };
    getAuthentication();
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
