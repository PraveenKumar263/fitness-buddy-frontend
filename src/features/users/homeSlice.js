import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  featuredClasses: [],
  featuredTrainers: [],
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getFeaturedClassesStart(state) {
      state.loading = true;
    },
    getFeaturedClassesSuccess(state, action) {
      state.loading = false;
      state.featuredClasses = action.payload;
    },
    getFeaturedClassesFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.featuredClasses = [];
    },
    getFeaturedTrainersStart(state) {
      state.loading = true;
    },
    getFeaturedTrainersSuccess(state, action) {
      state.loading = false;
      state.featuredTrainers = action.payload;
    },
    getFeaturedTrainersFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.featuredTrainers = [];
    },
  },
});

export const {
  getFeaturedClassesStart,
  getFeaturedClassesSuccess,
  getFeaturedClassesFail,
  getFeaturedTrainersStart,
  getFeaturedTrainersSuccess,
  getFeaturedTrainersFail,
} = homeSlice.actions;

export const selectHome = (state) => state.home;
export default homeSlice.reducer;
