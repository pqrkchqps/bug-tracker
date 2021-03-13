import { GET_PROJECT_USERS, ADD_PROJECT_USER, DELETE_PROJECT_USER, PROJECT_USERS_LOADING} from '../actions/types'

 const initialState = {
   loading: false,
   projectId: null,
   projectUsers: []
 }


export default function (state = initialState, action) {
  console.log(action)
  switch (action.type){
    case GET_PROJECT_USERS:
      return ({
        ...state,
        loading: false,
        projectId: action.payload.projectId,
        projectUsers: action.payload.projectUsers,
      })
    case DELETE_PROJECT_USER:
      if (action.payload === null){
        return ({
          ...state
        })
      }
      return ({
        ...state,
        projectUsers:
            state.projectUsers.filter(projectUser => projectUser.project_user_id !== Number(action.payload))
      })
    case ADD_PROJECT_USER:
      if (action.payload === null){
        return {
          ...state
        }
      }
      return {
        ...state,
        projectUsers: [action.payload, ...state.projectUsers]
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
