import { GET_BUGS, ADD_BUG, DELETE_BUG, BUGS_LOADING, EDIT_BUG} from '../actions/types'

 const initialState = {
   loading: false,
 }

const isBugIdsNotMatching = (id) => (bug) => bug.id !== id
export default function (state = initialState, action) {
  switch (action.type){
    case GET_BUGS:
      return ({
        ...state,
        lastAddedBug: null,
        ["bugs_"+action.payload.projectId]: action.payload.bugs.reverse(),
        loading: false
      })
    case DELETE_BUG:
      return ({
        ...state,
        lastAddedBug: null,
        ["bugs_"+action.payload.projectId]:
            state["bugs_"+action.payload.projectId].filter(isBugIdsNotMatching(action.payload.id))
      })
    case EDIT_BUG:
      return {
        ...state,
        lastAddedBug: null,
        ["bugs_"+action.payload.projectId]: [ ...state["bugs_"+action.payload.projectId].map(bug => bug.id === action.payload.bug.id ? action.payload.bug : bug)]
      }
    case ADD_BUG:
      return {
        ...state,
        lastAddedBug: action.payload.bug,
        ["bugs_"+action.payload.projectId]: [action.payload.bug, ...state["bugs_"+action.payload.projectId]]
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
