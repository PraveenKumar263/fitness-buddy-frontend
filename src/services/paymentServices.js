import instance from "./instance";

const API_URL = "/payment";

const paymentServices = {
  createSubscription: (email, plan) => {
    return instance.post(`${API_URL}/checkout`, { email, plan });
  },
};

export default paymentServices;
