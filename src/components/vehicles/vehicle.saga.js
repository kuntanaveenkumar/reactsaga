import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga';
import * as types from './actionTypes';
import * as api from './api.vehicle';
// This will be run when the LOGIN_REQUESTED
// Action is found by the watcher
export function* doVehicles(action) {

  try {
    const { sortby,sorttype,activePage,make,model,antennaUUID,vin,itemsCountPerPage } = action.payload;
    // pulls "calls" to our loginapi with our email and password
    // from our dispatched login action, and will PAUSE
    // here until the API async function, is complete!
    const responseJson = yield call(api.vehicles, {sortby:sortby,sorttype:sorttype,activePage:activePage,make:make,model:model,antennaUUID:antennaUUID,vin:vin,itemsCountPerPage:itemsCountPerPage});
  
    if (responseJson['result'] != "") {
     
     yield put({
        type: types.VEHICLES_SUCCEEDED,
        vehicles: responseJson['result']
      });
    }
    else {
      // when the above api call has completed it will "put",
      // or dispatch, an action of type LOGIN_FAILED with
      // the error response.
      yield put({
        type: types.VEHICLES_FAILED,
        payload: {
          error: 'vehicles list failed',
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
export function* doVehicleStatusUpdate(action) {

  try {
    const { id,activePage,make,model,antennaUUID,vin } = action.payload;
    // pulls "calls" to our loginapi with our email and password
    // from our dispatched login action, and will PAUSE
    // here until the API async function, is complete!
    const responseJson = yield call(api.updatevehicle, {id:id,activePage:activePage,make:make,model:model,antennaUUID:antennaUUID,vin:vin});
  
    if (responseJson['result'] != "") {
     
     yield put({
        type: types.VEHICLE_STATUS_UPDATE_SUCCEEDED,
        vehicles: responseJson['result']
      });
    }
    else {
      // when the above api call has completed it will "put",
      // or dispatch, an action of type LOGIN_FAILED with
      // the error response.
      yield put({
        type: types.VEHICLE_STATUS_UPDATE_FAILED,
        payload: {
          error: 'update vehicle failed',
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
export const watchVehicles = takeLatest(types.VEHICLES_REQUESTED, doVehicles)
export const watchupdateVehicle = takeLatest(types.VEHICLE_STATUS_UPDATE_REQUESTED, doVehicleStatusUpdate)
/***Wait until it sees login requested action is dispatched**********************/
/*export function* watchVehicles() {
  // takeLatest() takes the LATEST call of that action and runs it
  // if we we're to use takeEvery, it would take every single
  // one of the actions and kick off a new task to handle it
  // CONCURRENTLY!!!
  //wait for an action of ACTION_NAME to be dispatched. Returns the action object
  alert("watchVehicles");
  yield takeLatest(types.VEHICLES_REQUESTED, doVehicles);
}*/
