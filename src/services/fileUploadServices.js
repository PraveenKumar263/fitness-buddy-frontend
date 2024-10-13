import axios from "axios";

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      formData
    );

    if (response.data && response.data.data && response.data.data.url) {
      return {
        link: response.data.data.url,
      };
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export { uploadImage };
