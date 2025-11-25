import {all} from "redux-saga/effects";
import {watchSendOtpSaga} from "./sendOtpSaga";
import {watchVerifyOtpSaga} from "./verifyOtpSaga";
import {watchCreateBookingSaga} from "./bookingSaga";
import {authSaga} from "./authSaga";



export default function* rootSaga(){
    yield all([
        watchSendOtpSaga(),
        watchVerifyOtpSaga(),
        watchCreateBookingSaga(),
        authSaga(),
    ]);
}


