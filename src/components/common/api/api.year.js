import {URL} from '../../../constants/appConstants';
export function handleApiErrors (response) {  
	if (!response.ok) throw Error(response.statusText)
	return response
  }
  export function years(makeid,modelid) 
  {
              return fetch(URL+'years_by_makeid_modelid', {
              method: 'POST',
              headers: 
              {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + localStorage.getItem("token"),
               },   
               body: JSON.stringify({'modelid': modelid,'makeid':makeid }),      
               }).then(handleApiErrors)
               .then((response) => response.json());
              
  }