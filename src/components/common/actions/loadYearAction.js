import * as types from "../actionTypes/loadyearactionTypes";
export function ListYears(makeid,modelid) 
{      
    return {type: types.YEARS_REQUESTED,makeid:makeid,modelid:modelid}
}