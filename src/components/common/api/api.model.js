import {URL} from '../../../constants/appConstants';
export function handleApiErrors (response) {  
	if (!response.ok) throw Error(response.statusText)
	return response
  }
export function models(makeid) 
{
            return fetch(URL+'model_by_makeid_year', {
			method: 'POST',
			headers: 
			{
			 'Accept': 'application/json',
			 'Content-Type': 'application/json',
			 'Authorization': 'Bearer ' + localStorage.getItem("token"),
			 },   
             body: JSON.stringify({makeid:makeid}),      
			 }).then(handleApiErrors)
			 .then((response) => response.json());
			
}