import {createSlice,type PayloadAction} from "@reduxjs/toolkit";

interface sendOtpState{
    loading:boolean;
    error:string | null;
    success:boolean;
}

const initialState : sendOtpState = {
    loading : false,
    success : false,
    error : null,
}

const sendOtpSlice = createSlice({
    name : "sendOtp",
    initialState,
    reducers : {
        sendOtpRequest: (state, _action: PayloadAction<{ phone: string }>) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        },
        sendOtpSuccess : (state)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        sendOtpFailure : (state, action : PayloadAction<string>)=>{
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        }
   },

})

export const {sendOtpRequest, sendOtpSuccess, sendOtpFailure} = sendOtpSlice.actions;

export default sendOtpSlice.reducer;