import {call,put,takeLatest} from 'redux-saga/effects';
import {signupRequest,signupSuccess,signupFailure} from '../slices/authSlice'
import {signupApi} from '../services/authService';

function* signupSaga(action){

    try{
        const response  = yield call(signupApi,action.payload);
        yield put(signupSuccess(response));

    }catch(error : any){
        yield put(signupFailure(error.message || "Signup failed"));
    }

}


export function* authSaga(){
    yield takeLatest(signupRequest.type, signupSaga);
}