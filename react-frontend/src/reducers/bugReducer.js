import { GET_BUGS, ADD_BUG, DELETE_BUG, BUGS_LOADING} from '../actions/types'

 const initialState = {
   loading: false
 }


export default function (state = initialState, action) {
  switch (action.type){
    case GET_BUGS:
      return ({
        ...state,
        ["bugs_"+action.payload.projectId]: action.payload.bugs.reverse(),
        loading: false
      })
    case DELETE_BUG:
      return ({
        ...state,
        ["bugs_"+action.payload.projectId]:
            state["bugs_"+action.payload.projectId].filter(bug => bug.id !== action.payload.id)
      })
    case ADD_BUG:
      return {
        ...state,
        ["bugs_"+action.payload.projectId]: [action.payload.bug, ...state.["bugs_"+action.payload.projectId]]
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
