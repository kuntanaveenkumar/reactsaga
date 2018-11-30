import rootReducer from "../reducers/rootReducer";
import {applyMiddleware} from "redux";
import logger from 'redux-logger'
import {createStore } from "redux";
import createSagaMiddleware from 'redux-saga'

import { routerMiddleware } from 'react-router-redux'

import thunk  from "redux-thunk";
import rootSaga from '../sagas';
const sagaMiddleware = createSagaMiddleware()
//const routerMware = routerMiddleware(browserHistory)
const middleware = applyMiddleware(sagaMiddleware,logger);
const store = createStore(rootReducer,middleware);
sagaMiddleware.run(rootSaga)
export default store;