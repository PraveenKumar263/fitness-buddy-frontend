import instance from "./instance";

const API_URL = "/users";

const userServices = {
  getUserDetails: async () => {
    return await instance.get(`${API_URL}/me`);
  },
  updateUserDetails: async (updates) => {
    return await instance.put(`${API_URL}/me`, updates);
  },
  updateProfilePicture: async (profilePicture) => {
    return await instance.put(
      `${API_URL}/update-profile-picture`,
      profilePicture
    );
  },
};

export default userServices;
