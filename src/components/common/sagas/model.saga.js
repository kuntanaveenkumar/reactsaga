import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga';
import * as types from '../actionTypes/loadmodelsactionTypes';
import * as api from '../api/api.model';
export function* doModels(action) 
{
  try {
    const {makeid} = action;
    const responseJson = yield call(api.models,makeid);  
    if (responseJson['models'] != "") 
    {
        yield put({
        type: types.MODELS_SUCCEEDED,
        models: responseJson['models_list']
      });
    }
    else {     
      yield put({
        type: types.MODELS_FAILED,
        payload: {
          error: 'models failed',
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
export const watchModels = takeLatest(types.MODELS_REQUESTED, doModels)