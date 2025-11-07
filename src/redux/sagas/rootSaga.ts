import {all} from "redux-saga/effects";
import {watchSendOtpSaga} from "./sendOtpSaga";


export default function* rootSaga(){
    yield all([
        watchSendOtpSaga(),
    ]);
}

