export function loginRequest(data) 
{      
    return {type: 'LOGIN_REQUESTED', payload:{username:data.username,password:data.password,history:data.history}}
}