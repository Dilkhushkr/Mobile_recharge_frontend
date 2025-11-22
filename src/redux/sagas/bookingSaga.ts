import {call,put,takeLatest} from "redux-saga/effects";

import {
    creatingBookingRequest,
    creatingBookingSuccess,
    creatingBookingFailure} 
from '../slices/createBookingSlice';

import {createBookingApi} from '../services/authService';

function* createBookingSaga(action : any):any{
    try{
        const response = yield call(createBookingApi, action.payload);
        console.log("Booking response in saga :",response);
        yield put(creatingBookingSuccess(response));
        
    }catch(error : any){
        yield put(creatingBookingFailure(error.response?.data || "Something went wrong"));
    }

}


export function* watchCreateBookingSaga(){
    yield takeLatest(creatingBookingRequest.type, createBookingSaga);
}