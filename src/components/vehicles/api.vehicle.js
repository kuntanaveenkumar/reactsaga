import {URL} from '../../constants/appConstants';
export function handleApiErrors (response) 
{  
	if (!response.ok) throw Error(response.statusText)
	return response
}
export function vehicles(data) 
{
    
        return fetch(URL+'vehicles', {
        method: 'POST',
        headers: 
        {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
        body: JSON.stringify({limit:data.itemsCountPerPage,offset:(data.activePage-1)*data.itemsCountPerPage,sortby:data.sortby,sorttype:data.sorttype,make:data.make,model:data.model,antennaUUID:data.antennaUUID,vin:data.vin})
        }).then(handleApiErrors) 
        .then((response) => response.json());			
    
}
export function updatevehicle(data) 
{
   /* return fetch(URL+'updatevehiclestatus', {
    method: 'POST',
    headers: 
    {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("token"),
    },
    body: JSON.stringify({limit:15,offset:(data.activePage-1)*4,make:data.make,model:data.model,antennaUUID:data.antennaUUID,vin:data.vin})
    }).then(handleApiErrors) 
    .then((response) => response.json());	*/		
}