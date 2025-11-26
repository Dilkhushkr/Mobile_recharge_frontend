import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface SignupPayload {
    name: string;
    email: string;
    password: string;
}

interface AuthState {
    loading: boolean;
    error: string | null;
    signupData?: SignupPayload | null;

}

const initialState : AuthState = {

    loading : false,
    error : null,
    signupData : null,
}


const authSlice = createSlice({

    name : "auth",
    initialState,
    reducers:{

        signupRequest : (state, _action: PayloadAction<SignupPayload>)=>{
            state.loading = true;
            state.error = null;
        },
        signupSuccess : (state,action)=>{
            state.loading = false;
            state.error = null;
            state.signupData = action.payload;
        },
        signupFailure : (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }

    }
})

export const {
    signupRequest,
    signupSuccess, 
    signupFailure 
 } = authSlice.actions;

export default authSlice.reducer;

