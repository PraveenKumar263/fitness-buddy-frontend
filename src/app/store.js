import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import trainerReducer from "../features/users/trainerSlice";
import authReducer from "../features/auth/authSlice";
import homeReducer from "../features/users/homeSlice";
import classReducer from "../features/class/classSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    trainer: trainerReducer,
    home: homeReducer,
    class: classReducer,
  },
});
export default store;
