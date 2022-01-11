import { GET_ALL_USERS, USERS_LOADING, UPDATE_USER_INFO} from '../actions/types'

 const initialState = {
   users: [],
   loading: false
 }


export default function (state = initialState, action) {
  switch (action.type){
    case GET_ALL_USERS:
      return ({
        ...state,
        users: action.payload,
        loading: false
      })
    case USERS_LOADING:
      return {
        ...state,
        loading: true
      }
    case UPDATE_USER_INFO:
      return ({
        ...state,
        users: [ ...state.users.map(user => user.id === action.payload.id ? action.payload : user)]
      })
    default:
      return state;
  }
}
