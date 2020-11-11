import { GET_BUGS, ADD_BUG, DELETE_BUG, BUGS_LOADING} from '../actions/types'

 const initialState = {
   bugs: [],
   loading: false
 }


export default function (state = initialState, action) {
  switch (action.type){
    case GET_BUGS:
      return ({
        ...state,
        bugs: action.payload,
        loading: false
      })
    case DELETE_BUG:
      return ({
        ...state,
        bugs: state.bugs.filter(bug => bug.id !== action.payload)
      })
    case ADD_BUG:
      return {
        ...state,
        bugs: [action.payload, ...state.bugs]
      }
    case BUGS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}
