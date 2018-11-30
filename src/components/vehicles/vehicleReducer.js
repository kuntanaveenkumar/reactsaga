function vehicleReducer(state={vehicles: []}, action) 
{
    switch(action.type)
    {            
        case "VEHICLES_REQUESTED":     
        return action.vehicles?action.vehicles:null;        
        break; 
        case "VEHICLES_SUCCEEDED":     
        return action.vehicles?action.vehicles:null;        
        break; 
        case "VEHICLE_STATUS_UPDATE_REQUESTED":     
        return action.vehicles?action.vehicles:null;        
        break;              
        default:
        return state;
    }
}
export default vehicleReducer;