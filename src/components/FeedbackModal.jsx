import React from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import feedbackServices from "../services/feedbackServices";
import { selectUserId } from "../features/users/userSlice";
import { feedbackValidationSchema } from "../validations/feedbackValidation";

const FeedbackModal = ({ onClose, bookingClass, bookingId }) => {
  const userId = useSelector(selectUserId);

  const formik = useFormik({
    initialValues: {
      rating: 1,
      comment: "",
    },
    validationSchema: feedbackValidationSchema,
    onSubmit: async (values) => {
      try {
        await feedbackServices.createFeedback({
          userId: userId,
          bookingId: bookingId,
          classId: bookingClass._id,
          trainerId: bookingClass.trainer,
          rating: values.rating,
          comment: values.comment,
        });
        onClose();
        formik.resetForm();
      } catch (error) {
        console.error("Failed to submit feedback:", error);
      }
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Leave Feedback</h2>

        <form onSubmit={formik.handleSubmit}>
          <label className="block mb-2">
            Rating:
            <select
              name="rating"
              value={formik.values.rating}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border rounded w-full p-2 mt-1"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star}
                </option>
              ))}
            </select>
            {formik.touched.rating && formik.errors.rating && (
              <p className="text-red-600">{formik.errors.rating}</p>
            )}
          </label>
          <label className="block mb-2">
            Comment:
            <textarea
              name="comment"
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border rounded w-full p-2 mt-1"
              rows="4"
            />
            {formik.touched.comment && formik.errors.comment && (
              <p className="text-red-600">{formik.errors.comment}</p>
            )}
          </label>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
