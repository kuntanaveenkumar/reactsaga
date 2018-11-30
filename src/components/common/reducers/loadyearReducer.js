import * as types from "../actionTypes/loadyearactionTypes";
import { actionTypes } from "react-redux-form";
function loadyearReducer(state={ years: []}, action)
{
    switch(action.type)
    {
        case types.YEARS_SUCCEEDED:            
            return {...state,listyears: action.years};            
        break;
        default:
            return state;
    }
}
export default loadyearReducer;