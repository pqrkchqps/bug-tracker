import { GET_ALL_PROJECTS, GET_USER_PROJECTS, ADD_PROJECT, DELETE_PROJECT, PROJECTS_LOADING} from '../actions/types'

 const initialState = {
   projects: [],
   loading: false,
   userPermissions: []
 }


export default function (state = initialState, action) {
  console.log(action)
  switch (action.type){
    case GET_ALL_PROJECTS:
      return ({
        ...state,
        projects: action.payload.reverse(),
        userPermissions: [],
        loading: false
      })
    case GET_USER_PROJECTS:
      return ({
        ...state,
        projects: action.payload.projects.reverse(),
        userPermissions: action.payload.userPermissions,
        loading: false
      })
    case DELETE_PROJECT:
      return ({
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload)
      })
    case ADD_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects]
      }
    case PROJECTS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}
