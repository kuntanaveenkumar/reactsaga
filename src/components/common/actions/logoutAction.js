
export function logoutRequest(history) 
{      
    return {type: 'LOGOUT', payload:{history:history}}
}