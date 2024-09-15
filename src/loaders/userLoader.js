import authServices from "../services/authServices";

const userLoader = async () => {
    try {
        const response = await authServices.me();
        return response.data;
    } catch (error) {
        // console.error("Failed to load user data", error);
        return null;
    }
};

export default userLoader;
