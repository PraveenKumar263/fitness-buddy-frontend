// src/pages/Feedback.jsx
import React, { useEffect, useState } from "react";
import feedbackServices from "../services/feedbackServices"; // Make sure to create this service

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await feedbackServices.getFeedbackByTrainer(trainerId);
        setFeedbacks(response.data);
      } catch (err) {
        setError("Failed to load feedback");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [trainerId]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Feedback</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {feedbacks.length === 0 ? (
          <p className="text-center">No feedback available.</p>
        ) : (
          feedbacks.map((feedback) => (
            <div key={feedback._id} className="mb-4 border-b pb-4">
              <p className="text-gray-600">
                <strong>Rating:</strong> {feedback.rating}
              </p>
              <p className="text-gray-600">
                <strong>Comment:</strong> {feedback.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feedback;
