import {call,put,takeLatest} from 'redux-saga/effects';
import {verifyOtpRequest,verifyOtpSuccess,verifyOtpFailure} from '../slices/verfiyOtpSlice';
import {verifyOtpApi} from '../services/authService';
import axios from 'axios';



function* verifyOtpSaga(action : ReturnType<typeof verifyOtpRequest>): Generator<any, void, any> {

    try{
        const {phone , otp} = action.payload;
        const response =  yield call(verifyOtpApi, phone, otp);
        console.log('OTP Verification Response:', response);
        if(response?.token){
            const token = response.token;
            localStorage.setItem('token', token);
            // set axios default authorization header for subsequent API calls
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log('Token stored in localStorage and axios header set');
        }
        yield put(verifyOtpSuccess());
    
    }catch(error:any){

        yield put(verifyOtpFailure(error.message || "Failed to verify OTP"));

    }
}

export function* watchVerifyOtpSaga(){
    yield takeLatest(verifyOtpRequest.type, verifyOtpSaga);
}

