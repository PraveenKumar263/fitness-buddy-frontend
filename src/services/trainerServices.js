import instance from "./instance";

const API_URL = "/trainers";

const trainerServices = {
  getAllTrainers: async () => {
    return await instance.get(`${API_URL}`);
  },
  getTrainerByUserId: async (userId) => {
    return await instance.get(`${API_URL}/${userId}`);
  },
  updateTrainer: async (trainerId, updates) => {
    return await instance.put(`${API_URL}/${trainerId}`, updates);
  },
  getFeaturedTrainers: async () => {
    return await instance.get(`${API_URL}/featured`);
  },
};

export default trainerServices;
