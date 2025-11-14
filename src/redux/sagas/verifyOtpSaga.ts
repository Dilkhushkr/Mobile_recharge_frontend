import {call,put,takeLatest} from 'redux-saga/effects';
import {verifyOtpRequest,verifyOtpSuccess,verifyOtpFailure} from '../slices/verfiyOtpSlice';
import {verifyOtpApi} from '../services/authService';



function* verifyOtpSaga(action : ReturnType<typeof verifyOtpRequest>){

    try{
        const {phone , otp} = action.payload;
        const response =  yield call(verifyOtpApi, phone, otp);
        console.log('OTP Verification Response:', response);
        if(response?.tokne){
            localStorage.setItem('token',response.token)
            console.log('Token stored in localStorage');

        }
        yield put(verifyOtpSuccess());
    
    }catch(error:any){

        yield put(verifyOtpFailure(error.message || "Failed to verify OTP"));

    }
}

export function* watchVerifyOtpSaga(){
    yield takeLatest(verifyOtpRequest.type, verifyOtpSaga);
}

