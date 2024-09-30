import instance from "./instance";

const API_URL = "/recommendations";

const recommendationServices = {
  getClassRecommendations: () => {
    return instance.get(`${API_URL}`);
  },
};

export default recommendationServices;
