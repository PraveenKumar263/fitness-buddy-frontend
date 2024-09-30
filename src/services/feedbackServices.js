import instance from "./instance";

const API_URL = "/feedback";

const feedbackServices = {
  createFeedback: (feedbackData) => {
    return instance.post(`${API_URL}`, feedbackData);
  },
  getFeedbackByTrainer: (trainerId) => {
    return instance.get(`${API_URL}/feedback-trainer/${trainerId}`);
  },
  deleteFeedback: (feedbackId) => {
    return instance.delete(`${API_URL}/${feedbackId}`);
  },
  getFeedbackByBookingId: (bookingId) => {
    return instance.get(`${API_URL}/feedback-booking/${bookingId}`);
  },
};

export default feedbackServices;
