import { combineReducers } from "@reduxjs/toolkit";

import sendOtpReducer from "../slices/sendOtpSlice";
import verifyOtpReducer from "../slices/verfiyOtpSlice";

const rootReducer = combineReducers({
    sendOtp: sendOtpReducer,
    verifyOtp: verifyOtpReducer,

})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;