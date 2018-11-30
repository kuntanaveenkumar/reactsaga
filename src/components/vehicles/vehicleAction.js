//import $ from 'jquery';
//import fetch from 'cross-fetch' (include) import 'babel-polyfill'
import {URL} from "../../constants/appConstants";
import * as types from "./actionTypes";
export function getVehicles(data) 
{           
    return {type: types.VEHICLES_REQUESTED,payload:{sortby:data.sortby,sorttype:data.sorttype,activePage:data.activePage,make:data.make,model:data.model,antennaUUID:data.antennaUUID,vin:data.vin,itemsCountPerPage:data.itemsCountPerPage}}    
}
export function updateStatus(id) 
{           
    return {type: types.VEHICLE_STATUS_UPDATE_REQUESTED,payload:{id:id,sortby:data.sortby,sorttype:data.sorttype,activePage:data.activePage,make:data.make,model:data.model,antennaUUID:data.antennaUUID,vin:data.vin,itemsCountPerPage:data.itemsCountPerPage}}    
}
/*
export function setVehicles(vehicles)
{
    return {type:"GET_VEHICLES",vehicles};
}/*
export function setFailed(vehicles)
{
    return {type:"GET_EMPTY",vehicles};
}
export function settotalVehicles(total)
{
    return {type:"GET_TOTAL_VEHICLES",total};
}
export function setVehicle(vehicle)
{
    return {type:"GET_VEHICLE",vehicle};
}
export function clearVehicles()
{
    return {type:"GET_EMPTY"};
}
export function editvehicle(vehicle) {
    return { type: "EDIT_VEHICLE", vehicle};
}
export function updateVehicleStatus(vehicle){
    return { type: "UPDATE_VEHICLE_STATUS", vehicle};
}
export function updateStatus(id)
{
     return fetch(URL+'vehicles', {
        method: 'POST',
        headers: 
        {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + localStorage.getItem("token"),
         },
         body: JSON.stringify({id:id})
         }).then((response) => response.json())
         .then((responseJson) => 
         {
             dispatch(updateVehicleStatus(responseJson["result"]));
             return responseJson.success;
         })
         .catch((error) => {
         console.error(error);
         });
}


export function getVehicles(data) 
{ 
  return dispatch => 
   {        
       
 

            return fetch(URL+'vehicles', {
                   method: 'POST',
                   headers: 
                   {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    },
                    body: JSON.stringify({limit:15,offset:(data.activePage-1)*4,make:data.make,model:data.model,year:data.year,antennaUUID:data.antennaUUID,vin:data.vin})
                    }).then((response) => response.json())
                    .then((responseJson) => 
                    {
                        dispatch(setVehicles(responseJson["result"]));
                        return responseJson.success;
                    })
                    .catch((error) => {
                        dispatch(setFailed(''));
                    });
    };
}
*/