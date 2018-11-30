import {URL} from '../../../constants/appConstants';
export function handleApiErrors (response) {  
	if (!response.ok) throw Error(response.statusText)
	return response
  }
export function makes() 
{
            return fetch(URL+'makes', {
			method: 'GET',
			headers: 
			{
			 'Accept': 'application/json',
			 'Content-Type': 'application/json',
			 'Authorization': 'Bearer ' + localStorage.getItem("token"),
			 }
			 }).then(handleApiErrors)
			 .then((response) => response.json());
			
}