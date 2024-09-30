import instance from "./instance";

const API_URL = "/auth";

const authServices = {
  register: async (data) => {
    return await instance.post(`${API_URL}/register`, data);
  },
  activate: async (data) => {
    return await instance.put(`${API_URL}/activate`, data);
  },
  login: async (data) => {
    return await instance.post(`${API_URL}/login`, data);
  },
  forgot: async (data) => {
    return await instance.post(`${API_URL}/forgot`, data);
  },
  reset: async (token, newPassword) => {
    return await instance.post(`${API_URL}/reset/${token}`, { newPassword });
  },
  logout: async () => {
    return await instance.post(`${API_URL}/logout`);
  },
  checkAuth: async () => {
    return await instance.get(`${API_URL}/checkAuth`);
  },
};

export default authServices;
