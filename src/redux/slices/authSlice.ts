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
    user : any | null;

}

const initialState : AuthState = {

    loading : false,
    error : null,
    signupData : null,
    user : null
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
        },
        loginRequest : (state, _action: PayloadAction<any>)=>{
            state.loading = true;
            state.error = null;
            state.user = null;
            
        },
        loginSuccess : (state, action:PayloadAction<any>)=>{
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        },
        loginFailure : (state, action:PayloadAction<string>)=>{
            state.loading = false;
            state.error = action.payload;
            state.user = null;
        }

    }
})



export const {
    signupRequest,
    signupSuccess, 
    signupFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
 } = authSlice.actions;

export default authSlice.reducer;

