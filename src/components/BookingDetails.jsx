import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bookingServices from "../services/bookingServices";
import FeedbackModal from "./FeedbackModal";
import { extractDateFromUTC, extractTimeFromUTC } from "../utils/dateUtils";
import feedbackServices from "../services/feedbackServices";
import StarRating from "./StarRating";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [bookingStatus, setBookingStatus] = useState(null);
  const [bookingClass, setBookingClass] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await bookingServices.getBookingById(bookingId);
        const bookingData = response.data;
        setBookingStatus(bookingData.status);
        setBookingClass(bookingData.class);
      } catch (error) {
        setError("Failed to fetch booking details");
      }
    };

    const fetchFeedback = async () => {
      try {
        const response =
          await feedbackServices.getFeedbackByBookingId(bookingId);
        const feedbackData = response.data;
        setFeedback(feedbackData);
      } catch (error) {
        setError("Failed to fetch feedback for booking");
      }
    };

    fetchBookingDetails();
    fetchFeedback();
  }, [bookingId, feedback]);

  const handleCancel = async () => {
    try {
      await bookingServices.cancelBooking(bookingId);
    } catch (error) {
      setError("Failed to cancel booking");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFeedbackSubmit = (newFeedback) => {
    setFeedback((prevFeedback) => [...prevFeedback, newFeedback]);
    handleCloseModal();
  };

  if (!bookingStatus) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate("/dashboard/bookings")}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition duration-200"
      >
        Return to My Bookings
      </button>
      <h1 className="text-2xl font-semibold mb-6">Booking Details</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-medium mb-4">
          Class: <span className="font-bold">{bookingClass.title}</span>
        </h2>
        <div className="mb-4">
          <span className="font-semibold">Description:</span>{" "}
          {bookingClass.description}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Location:</span>{" "}
          {bookingClass.location}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Type:</span> {bookingClass.type}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Duration:</span>{" "}
          {bookingClass.duration} minutes
        </div>
        <div className="mb-4">
          <span className="font-semibold">Capacity:</span>{" "}
          {bookingClass.capacity}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Available Slots:</span>{" "}
          {bookingClass.slotsAvailable}
        </div>
        <p className="mb-2">
          <span className="font-semibold">Date:</span>{" "}
          {extractDateFromUTC(bookingClass.startTime, timeZone)}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Start Time:</span>{" "}
          {extractTimeFromUTC(bookingClass.startTime, timeZone)}
        </p>
        <p className="mb-2">
          <span className="font-semibold">End Time:</span>{" "}
          {extractTimeFromUTC(bookingClass.endTime, timeZone)}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Status:</span> {bookingStatus}
        </p>
        {bookingStatus === "Booked" && (
          <div className="mt-4">
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel Booking
            </button>
          </div>
        )}
        {bookingStatus === "Completed" && feedback.length === 0 && (
          <div className="mt-4">
            <button
              onClick={handleOpenModal}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Leave Feedback
            </button>
          </div>
        )}
      </div>

      {feedback.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Feedback</h2>
          {feedback.map((feedbackItem) => (
            <div
              key={feedbackItem._id}
              className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4"
            >
              <StarRating rating={feedbackItem.rating} />
              <p className="mt-1">Comments: {feedbackItem.comment}</p>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <FeedbackModal
          onClose={handleCloseModal}
          onSubmit={handleFeedbackSubmit}
          bookingClass={bookingClass}
          bookingId={bookingId}
        />
      )}
    </div>
  );
};

export default BookingDetails;
