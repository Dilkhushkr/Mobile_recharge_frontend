import {all} from "redux-saga/effects";
import {watchSendOtpSaga} from "./sendOtpSaga";
import {watchVerifyOtpSaga} from "./verifyOtpSaga";


export default function* rootSaga(){
    yield all([
        watchSendOtpSaga(),
        watchVerifyOtpSaga()
    ]);
}

