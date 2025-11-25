import { combineReducers } from "@reduxjs/toolkit";

import sendOtpReducer from "../slices/sendOtpSlice";
import verifyOtpReducer from "../slices/verfiyOtpSlice";
import createBookingReducer from "../slices/createBookingSlice";
import authReducer from "../slices/authSlice";


const rootReducer = combineReducers({
    sendOtp: sendOtpReducer,
    verifyOtp: verifyOtpReducer,
    createBooking: createBookingReducer,
    auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;