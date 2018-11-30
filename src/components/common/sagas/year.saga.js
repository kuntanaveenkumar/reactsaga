import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga';
import * as types from '../actionTypes/loadyearactionTypes';
import * as api from '../api/api.year';
export function* doYears(action) 
{
  try {
    const {makeid,modelid} = action;
    const responseJson = yield call(api.years,makeid,modelid);  
    if (responseJson['years'] != "") 
    {
        yield put({
        type: types.YEARS_SUCCEEDED,
        years: responseJson['years']
      });
    }
    else {     
      yield put({
        type: types.YEARS_FAILED,
        payload: {
          error: 'years failed',
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
export const watchYears = takeLatest(types.YEARS_REQUESTED, doYears)