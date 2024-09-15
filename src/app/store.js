import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/users/registerSlice";
import loginReducer from "../features/users/loginSlice";
import forgotReducer from "../features/users/forgotSlice";
import resetReducer from "../features/users/resetSlice";


const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        forgot: forgotReducer,
        reset: resetReducer
    }
});
export default store;