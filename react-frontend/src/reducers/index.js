import { combineReducers } from 'redux'
import bugReducer from './bugReducer'
import projectReducer from './projectReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import projectUsersReducer from './projectUsersReducer'
import userReducer from './userReducer'


export default combineReducers({
  bug: bugReducer,
  project: projectReducer,
  error: errorReducer,
  auth: authReducer,
  project_users: projectUsersReducer,
  user: userReducer
})
