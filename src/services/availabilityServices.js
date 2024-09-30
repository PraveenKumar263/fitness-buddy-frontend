import instance from "./instance";

const API_URL = "/availability";

const availabilityServices = {
  createAvailability: (availabilityData) => {
    return instance.post(`${API_URL}`, availabilityData);
  },
  getAvailabilityByTrainer: (trainerId) => {
    return instance.get(`${API_URL}/trainer/${trainerId}`);
  },
  deleteAvailability: (slotId) => {
    return instance.delete(`${API_URL}/${slotId}`);
  },
};

export default availabilityServices;
