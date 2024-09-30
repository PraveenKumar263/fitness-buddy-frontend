import instance from "./instance";

const API_URL = "/bookings";

const bookingServices = {
  createBooking: (bookingData) => {
    return instance.post(`${API_URL}`, bookingData);
  },
  getUserBookings: (userId) => {
    return instance.get(`${API_URL}/user/${userId}`);
  },
  getBookingById: (bookingId) => {
    return instance.get(`${API_URL}/${bookingId}`);
  },
  updateBooking: (bookingId, updates) => {
    return instance.put(`${API_URL}/${bookingId}`, updates);
  },
  rescheduleBooking: (bookingId, newStartTime, newEndTime) => {
    return instance.put(`${API_URL}/reschedule/${bookingId}`, {
      newStartTime,
      newEndTime,
    });
  },
  cancelBooking: (bookingId) => {
    return instance.put(`${API_URL}/cancel/${bookingId}`);
  },
  deleteBooking: (bookingId) => {
    return instance.delete(`${API_URL}/${bookingId}`);
  },
  updateBookingStatus: () => {
    return instance.put(`${API_URL}/status-all`);
  },
};

export default bookingServices;
