import * as api from '../api/api.auth';
import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga';
import * as types from '../actionTypes/loginactionTypes';
// This will be run when the LOGIN_REQUESTED
// Action is found by the watcher
export function* doLogin(action) {
  try {
    const { username, password, history } = action.payload;
    // pulls "calls" to our loginapi with our email and password
    // from our dispatched login action, and will PAUSE
    // here until the API async function, is complete!
    const responseJson = yield call(api.login, username, password);
    if (responseJson['error'] == "") {
      localStorage.setItem("token", responseJson["token"]["token"]);
      // when the above api call has completed it will "put",
      // or dispatch, an action of type LOGIN_SUCCEEDED with
      // the successful response.    
      yield put({
        type: types.LOGIN_SUCCEEDED,
        payload: {
          token: responseJson["token"]["token"],
          history: history
        }
      });
      history.push('/home')
    }
    else {
      // when the above api call has completed it will "put",
      // or dispatch, an action of type LOGIN_FAILED with
      // the error response.
      yield put({
        type: types.LOGIN_FAILED,
        payload: {
          error: 'user credentials are invalid',
          statusCode: '404'
        }
      });
    }
  }
  catch (error) {
    yield put({
      type: types.LOGIN_FAILED,
      payload: {
        error: error,
        statusCode: ''
      }
    });
  }
}
/***Wait until it sees login requested action is dispatched**********************/
export function* watchLogin() {
  // takeLatest() takes the LATEST call of that action and runs it
  // if we we're to use takeEvery, it would take every single
  // one of the actions and kick off a new task to handle it
  // CONCURRENTLY!!!
  //wait for an action of ACTION_NAME to be dispatched. Returns the action object
  yield takeLatest(types.LOGIN_REQUESTED, doLogin);
}


