import instance from "./instance";

const API_URL = "/classes";

const classServices = {
  createClass: (classData) => {
    return instance.post(`${API_URL}`, classData);
  },
  getAllClasses: () => {
    return instance.get(`${API_URL}`);
  },
  getAllClassesByTrainerId: (trainerId) => {
    return instance.get(`${API_URL}/trainer/${trainerId}`);
  },
  getClassById: (classId) => {
    return instance.get(`${API_URL}/${classId}`);
  },
  updateClass: (classId, updates) => {
    return instance.put(`${API_URL}/${classId}`, updates);
  },
  deleteClass: (classId) => {
    return instance.delete(`${API_URL}/${classId}`);
  },
  getFeaturedClasses: () => {
    return instance.get(`${API_URL}/featured`);
  },
};

export default classServices;
