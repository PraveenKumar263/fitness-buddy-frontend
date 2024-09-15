import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import HomeNav from './wrappers/HomeNav';
import Register from './components/Register';
import Login from './components/Login';
import Forgot from './components/Forgot';
import Reset from './components/Reset';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import userLoader from './loaders/userLoader';
import Activate from './components/Activate';

// Render NavBar only when user has been authenticated
const AuthLayout = () => (
  <>
    <HomeNav />
    <Outlet />
  </>
);

// Prior to authentication
const NonAuthLayout = () => (
  <Outlet />
);


// Setup routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <NonAuthLayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "activate",
        element: <Activate />,
      },
      {
        path: "",
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
    ],
  },
  {
    path: "/dashboard",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        loader: userLoader,
      },
    ],
  },
  {
    path: "logout",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <Logout />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
