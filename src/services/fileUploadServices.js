import axios from "axios";

const IMGUR_CLIENT_ID = import.meta.env.IMGUR_CLIENT_ID; // Update to your env variable name

const uploadImageToImgur = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(
      "https://api.imgur.com/3/image",
      formData,
      {
        headers: {
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        },
      }
    );

    if (response.data && response.data.data && response.data.data.link) {
      return {
        link: response.data.data.link,
        deleteHash: response.data.data.deletehash, // Store this for deletion
      };
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

const deleteImageFromImgur = async (deleteHash) => {
  try {
    const response = await axios.delete(
      `https://api.imgur.com/3/image/${deleteHash}`,
      {
        headers: {
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        },
      }
    );

    return response.data.success; // Returns true if the delete was successful
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

export { uploadImageToImgur, deleteImageFromImgur };
