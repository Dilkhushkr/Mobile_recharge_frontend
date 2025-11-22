import {all} from "redux-saga/effects";
import {watchSendOtpSaga} from "./sendOtpSaga";
import {watchVerifyOtpSaga} from "./verifyOtpSaga";
import {watchCreateBookingSaga} from "./bookingSaga";


export default function* rootSaga(){
    yield all([
        watchSendOtpSaga(),
        watchVerifyOtpSaga(),
        watchCreateBookingSaga(),
    ]);
}

