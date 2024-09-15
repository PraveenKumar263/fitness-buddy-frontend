import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    role: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.firstName = action.payload;
            state.lastName = action.payload;
            state.email = action.payload;
            state.role = action.payload;
        },
        clearUser: (state) => {
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.role = '';
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state) => ({
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
    role: state.user.role
});

export default userSlice.reducer;
