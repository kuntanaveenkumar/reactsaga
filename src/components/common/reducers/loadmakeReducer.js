import * as types from "../actionTypes/loadmakesactionTypes";
import { actionTypes } from "react-redux-form";
function loadmakeReducer(state={ makes: []}, action)
{
    switch(action.type)
    {
        case types.MAKES_SUCCEEDED:            
            return {...state,listmakes: action.makes};            
        break;
        default:
            return state;
    }
}
export default loadmakeReducer;