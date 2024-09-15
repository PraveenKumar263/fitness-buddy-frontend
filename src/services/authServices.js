import instance from "./instance";

const authServices = {
    register: async (data) => {
        return await instance.post('/auth/register', data);
    },
    activate: async (data) => {
        return await instance.put('/auth/activate', data);
    },
    login: async (data) => {
        return await instance.post('/auth/login', data);
    },
    forgot: async (data) => {
        return await instance.post('/auth/forgot', data);
    },
    reset: async (token, newPassword) => {
        return await instance.post(`/auth/reset/${token}`, { newPassword });
    },
    logout: async () => {
        return await instance.post('/auth/logout');
    },
    me: async () => {
        return await instance.get('/auth/me');
    },
}

export default authServices;
