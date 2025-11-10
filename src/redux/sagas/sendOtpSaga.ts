import {call,put,takeLatest} from "redux-saga/effects";
import {sendOtpRequest,sendOtpSuccess,sendOtpFailure} from '../slices/sendOtpSlice';

import {sendOtpApi} from '../services/authService';

function* sendOtpSaga(action : ReturnType<typeof sendOtpRequest>){
    try{
        yield call(sendOtpApi, action.payload.phone);
        yield put(sendOtpSuccess());
    }catch(error:any){
        yield put(sendOtpFailure(error.message || "Failed to send OTP"));
    }
}


export function* watchSendOtpSaga(){
    yield takeLatest(sendOtpRequest.type, sendOtpSaga);
}


