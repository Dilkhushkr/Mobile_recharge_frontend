import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../store/rootReducer";
import rootSaga from "../sagas/rootSaga";

const sagaMiddleWare = createSagaMiddleware();

const store = configureStore({
    reducer : rootReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({thunk:false}).concat(sagaMiddleWare)
});

sagaMiddleWare.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export default store;
