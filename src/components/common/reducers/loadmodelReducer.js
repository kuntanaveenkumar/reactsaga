import * as types from "../actionTypes/loadmodelsactionTypes";
function loadmodelReducer(state={ models: []}, action)
{
    switch(action.type)
    {
        case types.MODELS_SUCCEEDED:            
            return {...state,listmodels: action.models};            
        break;
        default:
            return state;
    }
}
export default loadmodelReducer;