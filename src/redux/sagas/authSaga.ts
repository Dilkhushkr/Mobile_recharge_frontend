import {call,put,takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
    signupRequest,
    signupSuccess,
    signupFailure,
    loginRequest,
    loginSuccess,
    loginFailure
,} from '../slices/authSlice'
import {signupApi,LoginApi}from '../services/authService';

function* signupSaga(action: ReturnType<typeof signupRequest>): Generator<any, void, any>{

    try{
        console.log('signupSaga received payload:', action.payload);
        const response  = yield call(signupApi, action.payload);
        console.log('Signup Response:', response);
        yield put(signupSuccess(response));

    }catch(error : any){
        console.error('Signup error:', error.response?.data || error.message || error);
        const message = error.response?.data?.message || error.message || 'Signup failed';
        yield put(signupFailure(message));
    }

}

function* loginSaga(action: ReturnType<typeof loginRequest>): Generator<any, void, any>{

    try{
 
        const payload = action.payload;
        console.log('loginSaga received payload:', payload);

        const response  = yield call(LoginApi, payload);
        console.log('Login Response:', response);
        const token = response?.token ?? response?.data?.token;
        const user = response?.user ?? response?.data?.user;
        if (token) {
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            console.log("Login token stored and axios header set");
        }
        yield put(loginSuccess(user));

    }
    catch(error : any){
        const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||"Login failed";
        console.error("Login error:", error?.response?.data || error);
        yield put(loginFailure(String(message)));
    }

}


export function* authSaga(){
    yield takeLatest(signupRequest.type, signupSaga);
    yield takeLatest(loginRequest.type, loginSaga);
}

