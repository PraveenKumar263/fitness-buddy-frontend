import store from "../app/store";
import { setTrainer, setTrainerError } from "../features/users/trainerSlice";
import { setUser, setUserError } from "../features/users/userSlice";
import trainerServices from "../services/trainerServices";
import userServices from "../services/userServices";

const userLoader = async () => {
  try {
    // Get user details
    const userResponse = await userServices.getUserDetails();
    const userData = userResponse.data;

    if (userResponse.statusText !== "OK") {
      if (!userData) {
        let userError = userData.message || "Failed to fetch user";
        store.dispatch(setUserError(userError));
      } else {
        let userError = "Failed to fetch user";
        store.dispatch(setUserError(userError));
        return null;
      }
    }

    // Update user slice
    store.dispatch(setUser(userData));

    // Get trainer details, if needed
    if (userData.role === "trainer") {
      const trainerResponse = await trainerServices.getTrainerByUserId(
        userData._id
      );
      const trainerData = trainerResponse.data;

      if (!trainerResponse.statusText !== "OK") {
        if (!trainerData) {
          let trainerError = trainerData.message || "Failed to fetch user";
          store.dispatch(setTrainerError(trainerError));
        } else {
          // Update trainer slice
          store.dispatch(setTrainer(trainerData));
        }
      }
    }

    return userData;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export default userLoader;
