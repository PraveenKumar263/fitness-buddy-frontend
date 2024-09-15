
import { Link, useLoaderData } from "react-router-dom";

const Dashboard = () => {
  const user = useLoaderData();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {user ? (
          <div>
            <p className="text-lg">Welcome, <span className="font-semibold">{user.firstName} {user.lastName}</span>!</p>
          </div>
        ) : (
          <p className="text-lg">Loading user details...</p>
        )}
        <div className="mt-6">
          <Link to="/logout" className="text-indigo-600 hover:text-indigo-800">Logout</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
