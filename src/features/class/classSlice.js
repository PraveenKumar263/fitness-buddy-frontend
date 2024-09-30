import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classes: [],
  currentClass: null,
  loading: false,
  error: null,
};

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    setClasses(state, action) {
      state.classes = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentClass(state, action) {
      state.currentClass = action.payload;
    },
    clearCurrentClass(state) {
      state.currentClass = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
      state.error = null;
    },
    setError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addClass(state, action) {
      state.classes.push(action.payload);
      state.currentClass = null;
    },
    updateClass(state, action) {
      const index = state.classes.findIndex(
        (cls) => cls._id === action.payload._id
      );
      if (index > -1) {
        state.classes[index] = action.payload;
        state.currentClass = action.payload;
      }
    },
    deleteClass(state, action) {
      state.classes = state.classes.filter((cls) => cls._id !== action.payload);
      state.currentClass = null;
    },
  },
});

export const {
  setClasses,
  setCurrentClass,
  clearCurrentClass,
  setLoading,
  setError,
  addClass,
  updateClass,
  deleteClass,
} = classSlice.actions;

export const selectClasses = (state) => state.class.classes;
export const selectClass = (state) => {
  return state.class.currentClass;
};
export const selectLoading = (state) => state.class.loading;
export const selectError = (state) => state.class.error;

export default classSlice.reducer;
