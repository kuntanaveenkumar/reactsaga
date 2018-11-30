import * as types from "../actionTypes/loadmodelsactionTypes";
export function ListModels(makeid) 
{    
    return {type: types.MODELS_REQUESTED,makeid:makeid}
}