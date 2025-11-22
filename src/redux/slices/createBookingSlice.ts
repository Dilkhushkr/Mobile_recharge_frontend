import { createSlice } from "@reduxjs/toolkit";

interface createBookingState {
    loading : boolean;
    error : string | null;
    booking : any | null;
}

const initialState : createBookingState = {
    loading : false,
    booking : null,
    error : null,
}


const createBookingSlice = createSlice({
    name : "booking",
    initialState,
    reducers : {
        
        creatingBookingRequest : (state,action)=>{
            state.loading = true;
            state.error = null;
            state.booking = null;
        },
        creatingBookingSuccess : (state, action)=>{
            state.loading = false;
            state.booking = action.payload;
            state.error = null;
        },
        creatingBookingFailure : (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.booking = null;
        }
    
    }

})

export const {
  creatingBookingRequest,
  creatingBookingSuccess,
  creatingBookingFailure,
} = createBookingSlice.actions;

export default createBookingSlice.reducer;

