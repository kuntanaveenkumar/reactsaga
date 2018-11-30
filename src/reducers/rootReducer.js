import { combineReducers } from "redux";

import logoutReducer from '../components/common/reducers/logoutReducer';
import loginReducer from "../components/common/reducers/loginReducer";
import vehicleReducer from "../components/vehicles/vehicleReducer";
import loadmakeReducer from "../components/common/reducers/loadmakeReducer";
import loadmodelReducer from "../components/common/reducers/loadmodelReducer";
import loadyearReducer from "../components/common/reducers/loadyearReducer";
const rootReducer = combineReducers({
    login:loginReducer,
    logout:logoutReducer,
    vehicles:vehicleReducer,
    listmakes:loadmakeReducer,
    listmodels:loadmodelReducer,
    listyears:loadyearReducer
  });

  export default rootReducer