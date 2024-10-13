import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  firstName: null,
  lastName: null,
  email: null,
  isActive: false,
  role: null,
  phone: null,
  profilePicture: null,
  fitnessGoals: [],
  preferences: {
    classTypes: [],
    preferredTimes: [],
  },
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {
        _id = null,
        firstName = null,
        lastName = null,
        email = null,
        isActive = false,
        role = null,
        phone = null,
        profilePicture = null,
        fitnessGoals = [],
        preferences = { classTypes: [], preferredTimes: [] },
        error = null,
      } = action.payload;

      state._id = _id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.isActive = isActive;
      state.role = role;
      state.phone = phone;
      state.profilePicture = profilePicture;
      state.fitnessGoals = fitnessGoals;
      state.preferences = preferences;
      state.error = error;
    },
    setUserError: (state, action) => {
      state.error = action.payload;
    },
    clearUser: (state) => initialState,
    updateUserBasicInfo: (state, action) => {
      const { _id, firstName, lastName, email, phone } = action.payload;
      state._id = _id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.phone = phone;
    },
  },
});

export const { setUser, setUserError, clearUser, updateUserBasicInfo } =
  userSlice.actions;

export const selectUser = (state) => state.user;
export const selectUserId = (state) => state.user._id;
export const selectUserRole = (state) => state.user.role;
export const selectUserFirstName = (state) => state.user.firstName;
export const selectUserEmail = (state) => state.user.email;

export default userSlice.reducer;
