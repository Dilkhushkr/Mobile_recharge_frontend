import {call,put,takeLatest} from 'redux-saga/effects';
import {signupRequest,signupSuccess,signupFailure} from '../slices/authSlice'
import {signupApi} from '../services/authService';

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


export function* authSaga(){
    yield takeLatest(signupRequest.type, signupSaga);
}