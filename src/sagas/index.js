import * as authSaga from '../components/common/sagas/auth.saga'
import * as logoutSaga from '../components/common/sagas/logout.saga'
import * as vehicleSaga from '../components/vehicles/vehicle.saga'
import * as makeSaga from '../components/common/sagas/make.saga'
import * as modelSaga from '../components/common/sagas/model.saga'
import * as yearSaga from '../components/common/sagas/year.saga'
import { fork} from 'redux-saga/effects'
import {  all } from 'redux-saga/effects'
export default function *rootSaga() {
  /*yield[fork(authSaga.watchLogin)]
 

  yield ([
    authSaga.watchLogOut,
    vehicleSaga.watchVehicles
  ])
*/
  yield all([
    fork(authSaga.watchLogin),
    vehicleSaga.watchVehicles,
    makeSaga.watchMakes,
    modelSaga.watchModels,
    yearSaga.watchYears
  ])
}