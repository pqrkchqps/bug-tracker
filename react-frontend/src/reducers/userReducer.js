import { GET_ALL_USERS, USERS_LOADING} from '../actions/types'

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
    default:
      return state;
  }
}
