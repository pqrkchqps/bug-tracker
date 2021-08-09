import { GET_PROJECT_USERS, ADD_PROJECT_USER, DELETE_PROJECT_USER, PROJECT_USERS_LOADING, UPDATE_PROJECT_USERS} from '../actions/types'

 const initialState = {
   loading: false,
   projectId: null,
   projectUsers: []
 }


export default function (state = initialState, action) {
  switch (action.type){
    case GET_PROJECT_USERS:
      return ({
        ...state,
        loading: false,
        projectId: action.payload.projectId,
        projectUsers: action.payload.projectUsers,
      })
    case UPDATE_PROJECT_USERS:
      return ({
        ...state,
        loading: false,
        projectUsers: action.payload,
      })
    case DELETE_PROJECT_USER:
      return ({
        ...state,
        projectUsers:
            state.projectUsers.filter(projectUser => projectUser.project_user_id !== Number(action.payload))
      })
    case ADD_PROJECT_USER:
      return {
        ...state,
        projectUsers: [...state.projectUsers, action.payload]
      }
    case PROJECT_USERS_LOADING:
      return {
        ...state,
        loading: true,
        projectId: null,
        projectUsers: [],
      }
    default:
      return state;
  }
}
