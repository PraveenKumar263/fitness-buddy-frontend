import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectUserFirstName,
  selectUserRole,
} from "../features/users/userSlice";

const Dashboard = () => {
  const firstName = useSelector(selectUserFirstName);
  const userRole = useSelector(selectUserRole);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Dashboard</h1>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Welcome, {firstName}!
          </h2>
          <p className="text-gray-700">Here’s an overview of your activity:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userRole !== "trainer" && (
            <>
              <div className="bg-blue-50 p-6 rounded-lg shadow-lg hover:bg-blue-100 transition duration-300">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">
                  My Bookings
                </h3>
                <p className="text-gray-700">Manage and view your bookings.</p>
                <Link
                  to="/dashboard/bookings"
                  className="text-blue-600 hover:underline"
                >
                  View Bookings
                </Link>
              </div>

              <div className="bg-green-50 p-6 rounded-lg shadow-lg hover:bg-green-100 transition duration-300">
                <h3 className="text-xl font-semibold text-green-800 mb-3">
                  Available Classes
                </h3>
                <p className="text-gray-700">
                  Explore and book available classes.
                </p>
                <Link to="/classes" className="text-green-600 hover:underline">
                  View Classes
                </Link>
              </div>
            </>
          )}

          {userRole === "trainer" && (
            <div className="bg-yellow-50 p-6 rounded-lg shadow-lg hover:bg-yellow-100 transition duration-300">
              <h3 className="text-xl font-semibold text-yellow-800 mb-3">
                My Classes
              </h3>
              <p className="text-gray-700">Manage and view your classes.</p>
              <Link
                to="/dashboard/my-classes"
                className="text-yellow-600 hover:underline"
              >
                View My Classes
              </Link>
            </div>
          )}

          <div className="bg-purple-50 p-6 rounded-lg shadow-lg hover:bg-purple-100 transition duration-300">
            <h3 className="text-xl font-semibold text-purple-800 mb-3">
              My Profile
            </h3>
            <p className="text-gray-700">
              View and edit your profile information.
            </p>
            <Link
              to="/dashboard/profile"
              className="text-purple-600 hover:underline"
            >
              Go to Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
