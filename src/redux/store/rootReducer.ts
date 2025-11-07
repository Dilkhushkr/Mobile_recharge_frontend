import { combineReducers } from "@reduxjs/toolkit";

import sendOtpReducer from "../slices/sendOtpSlice";

const rootReducer = combineReducers({
    sendOtp: sendOtpReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;