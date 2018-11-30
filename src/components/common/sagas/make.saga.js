import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga';
import * as types from '../actionTypes/loadmakesactionTypes';
import * as api from '../api/api.make';
export function* doMakes() 
{
  try {
   
    const responseJson = yield call(api.makes);  
    if (responseJson['makes'] != "") 
    {
        yield put({
        type: types.MAKES_SUCCEEDED,
        makes: responseJson['makes']
      });
    }
    else {
      // when the above api call has completed it will "put",
      // or dispatch, an action of type LOGIN_FAILED with
      // the error response.
      yield put({
        type: types.MAKES_FAILED,
        payload: {
          error: 'makes failed',
          statusCode: '404'
        }
      });
    }
  }
  catch (error) {
    /*yield put({
      type: types.VEHICLES_FAILED,
      payload: {
        error: error,
        statusCode: ''
      }
    });*/
  }
}
export const watchMakes = takeLatest(types.MAKES_REQUESTED, doMakes)