import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  firstName: null,
  lastName: null,
  rating: null,
  qualifications: [],
  expertise: [],
  specializations: [],
  introduction: null,
  photos: [],
  videos: [],
  error: null,
};

export const trainerSlice = createSlice({
  name: "trainer",
  initialState,
  reducers: {
    setTrainer: (state, action) => {
      const {
        _id = null,
        user = null,
        rating = null,
        qualifications = [],
        expertise = [],
        specializations = [],
        introduction = null,
        photos = [],
        videos = [],
        error = null,
      } = action.payload;

      state._id = _id;
      state.firstName = user.firstName;
      state.lastName = user.lastName;
      state.rating = rating;
      state.qualifications = qualifications;
      state.expertise = expertise;
      state.specializations = specializations;
      state.introduction = introduction;
      state.photos = photos;
      state.videos = videos;
      state.error = error;
    },

    setTrainerError: (state, action) => {
      state.error = action.payload;
    },
    clearTrainer: (state) => initialState,
  },
});

export const { setTrainer, setTrainerError, clearTrainer } =
  trainerSlice.actions;

export const selectTrainer = (state) => state.trainer;
export const selectTrainerId = (state) => state.trainer._id;

export default trainerSlice.reducer;
