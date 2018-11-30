import { takeLatest } from 'redux-saga';
import * as types from '../actionTypes/loginactionTypes';
export function* doLogout(action) {

    const { history } = action.payload;
    localStorage.setItem("token",'');
    localStorage.removeItem("token");
    history.push('/index')
  }
  export const watchLogOut = takeLatest(types.LOGOUT, doLogout)
  