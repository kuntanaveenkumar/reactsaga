import {URL} from '../../../constants/appConstants';
export function handleApiErrors (response) {  
	if (!response.ok) throw Error(response.statusText)
	return response
  }
export function login(username, password) 
{
            return fetch(URL+'authenticate', {
			method: 'POST',
			headers: 
			{
			 'Accept': 'application/json',
			 'Content-Type': 'application/json',
			 'Authorization': 'Bearer ' + localStorage.getItem("token"),
			 },
			 body: JSON.stringify({'username':username,'password':password})
			 }).then(handleApiErrors) 
			 .then((response) => response.json());
			
}