import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

interface VerifyOtpState {
    loading : boolean;
    success : boolean;
    error : string | null;
}

const initialState : VerifyOtpState  = {

    loading : false,
    success : false,
    error : null,

}

const VerifyOtpSlice = createSlice({

    name : "verifyOtp",
    initialState,
    reducers : {
        verifyOtpRequest : (state , _action :PayloadAction<{phone:string, otp:string}>)=>{
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        verifyOtpSuccess : (state)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        verifyOtpFailure : (state, action : PayloadAction<string>)=>{
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        }

    }

})


export const {verifyOtpRequest, verifyOtpSuccess, verifyOtpFailure} = VerifyOtpSlice.actions;

export default VerifyOtpSlice.reducer;
