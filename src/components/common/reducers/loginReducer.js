import {  
    LOGIN_REQUESTED,
    LOGIN_SUCCEEDED,
    LOGIN_FAILED,
  } from '../../../components/common/actionTypes/loginactionTypes'

const initialState = {  
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
  }

function loginReducer(state={initialState: []}, action)
{
    switch(action.type)
    {  
        
        case LOGIN_REQUESTED:
        return {
          requesting: true,
          successful: false,
          messages: [{ body: 'Logging in...', time: new Date() }],
          errors: [],
        }
  
      // Successful?  Reset the login state.
      case LOGIN_SUCCEEDED:
        return {
          errors: [],
          messages: [],
          requesting: false,
          successful: true,
        }
        
      // Append the error returned from our api
      // set the success and requesting flags to false
      case LOGIN_FAILED:
        return {
          errors: state.errors.concat([{
            body: action.payload.error.toString(),
            time: new Date(),
          }]),
          messages: [],
          requesting: false,
          successful: false,
        }
        default:
            return state;
    }
}
export default loginReducer