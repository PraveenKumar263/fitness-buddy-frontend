import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setError,
  setCurrentClass,
  selectClass,
  selectLoading,
  selectError,
  updateClass,
  deleteClass,
} from "../features/class/classSlice";
import classServices from "../services/classServices";
import { selectUserId, selectUserRole } from "../features/users/userSlice";
import EditClassForm from "./EditClassForm";
import {
  convertToUTC,
  extractDateFromUTC,
  extractTimeFromUTC,
} from "../utils/dateUtils";
import bookingServices from "../services/bookingServices";
import StarRating from "./StarRating";

const ClassDetails = () => {
  const { classId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classDetails = useSelector(selectClass);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const userRole = useSelector(selectUserRole);
  const [isEditing, setIsEditing] = useState(false);
  const [originalDetails, setOriginalDetails] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const userId = useSelector(selectUserId);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const location = useLocation();

  useEffect(() => {
    const fetchClassDetails = async () => {
      dispatch(setLoading(true));
      try {
        const response = await classServices.getClassById(classId);
        dispatch(setCurrentClass(response.data));
        setOriginalDetails(response.data);
      } catch (error) {
        dispatch(
          setError(
            error.response?.data?.message || "Failed to load class details."
          )
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (!classDetails || Object.keys(classDetails).length === 0) {
      fetchClassDetails();
    } else {
      setOriginalDetails(classDetails);
    }
  }, [classId, classDetails, dispatch]);

  const handleSave = async (values) => {
    setIsEditing(false);
    try {
      const utcStartTime = convertToUTC(
        values.startTime,
        timeZone
      ).toISOString();
      const utcEndTime = convertToUTC(values.endTime, timeZone).toISOString();

      const updateData = {
        ...values,
        startTime: utcStartTime,
        endTime: utcEndTime,
        _id: originalDetails._id,
      };

      const response = await classServices.updateClass(
        originalDetails._id,
        updateData
      );
      dispatch(updateClass(response.data));
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "Failed to save class details.")
      );
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        await classServices.deleteClass(classId);
        dispatch(deleteClass(classId));
      } catch (err) {
        dispatch(
          setError(err.response?.data?.message || "Failed to delete class.")
        );
      }
    }
  };

  const handleBooking = () => {
    if (!userId) {
      localStorage.setItem("redirectPath", location.pathname);
      navigate("/login");
    }
    setIsAlertVisible(true);
    setBookingError(null);
  };

  const confirmBooking = async () => {
    try {
      await bookingServices.createBooking({ userId, classId });
      setIsAlertVisible(false);
    } catch (error) {
      setBookingError("Failed to book the class. Please try again.");
    }
  };

  const cancelBooking = () => {
    setIsAlertVisible(false);
  };

  const isBookingDisabled = () => {
    const now = new Date();
    const startTime = new Date(classDetails.startTime);
    return startTime <= now || classDetails.slotsAvailable === 0;
  };

  if (loading)
    return <div className="text-center">Loading class details...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!classDetails) return <div>No class details found.</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      {/* Back Button */}
      <button
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <h1 className="text-2xl font-bold mb-4">{classDetails.title}</h1>
      <div className="mb-4">
        <span className="font-semibold">Description:</span>{" "}
        {classDetails.description}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Location:</span> {classDetails.location}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Type:</span> {classDetails.type}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Duration:</span> {classDetails.duration}{" "}
        minutes
      </div>
      <div className="mb-4">
        <span className="font-semibold">Capacity:</span> {classDetails.capacity}
      </div>
      {userRole === "user" && (
        <div className="mb-4">
          <span className="font-semibold">Available Slots:</span>{" "}
          {classDetails.slotsAvailable}
        </div>
      )}
      <div className="mb-4">
        <span className="font-semibold">Start Time:</span>{" "}
        {extractDateFromUTC(classDetails.startTime, timeZone)} at{" "}
        {extractTimeFromUTC(classDetails.startTime, timeZone)}
      </div>
      <div className="mb-4">
        <span className="font-semibold">End Time:</span>{" "}
        {extractDateFromUTC(classDetails.endTime, timeZone)} at{" "}
        {extractTimeFromUTC(classDetails.endTime, timeZone)}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Rating:</span>{" "}
        <StarRating rating={classDetails.rating} />
      </div>
      {/* Trainer editable data */}
      {userRole === "trainer" ? (
        <div className="mt-4 flex space-x-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-200"
            onClick={() => setIsEditing(true)}
          >
            Edit Class
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600 transition duration-200"
            onClick={handleDelete}
          >
            Delete Class
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <button
            className={`bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600 transition duration-200 ${
              isBookingDisabled() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleBooking}
            disabled={isBookingDisabled()}
          >
            Book Class
          </button>
        </div>
      )}

      {isEditing && (
        <EditClassForm
          classDetails={originalDetails}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}

      {isAlertVisible && (
        <div className="mt-4">
          <p className="text-green-500">Booking Confirmation</p>
          <button
            onClick={confirmBooking}
            className="bg-blue-500 text-white py-2 px-4 rounded shadow"
          >
            Confirm
          </button>
          <button
            onClick={cancelBooking}
            className="bg-red-500 text-white py-2 px-4 rounded shadow ml-2"
          >
            Cancel
          </button>
          {bookingError && <div className="text-red-500">{bookingError}</div>}
        </div>
      )}
    </div>
  );
};

export default ClassDetails;
