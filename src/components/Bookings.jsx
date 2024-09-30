import React, { useEffect, useState } from "react";
import bookingServices from "../services/bookingServices";
import { useSelector } from "react-redux";
import { selectUserId } from "../features/users/userSlice";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const userId = useSelector(selectUserId);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!userId) return;
        const updateAllBookingStatus =
          await bookingServices.updateBookingStatus();
        const response = await bookingServices.getUserBookings(userId);
        const bookingsData = response.data;
        setBookings(bookingsData);
      } catch (error) {
        setError("Failed to fetch bookings");
      }
    };

    fetchBookings();
  }, [userId]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">My Bookings</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-600">
            <th className="py-3 px-4">Class</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="4" className="py-3 px-4 text-center">
                No bookings found.
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr key={booking._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{booking.class.title}</td>
                <td className="py-3 px-4">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 capitalize">{booking.status}</td>
                <td className="py-3 px-4">
                  <a
                    href={`/dashboard/bookings/${booking._id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View Details
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
