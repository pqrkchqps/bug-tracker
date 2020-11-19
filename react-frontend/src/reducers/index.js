import { combineReducers } from 'redux'
import bugReducer from './bugReducer'
import projectReducer from './projectReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'


export default combineReducers({
  bug: bugReducer,
  project: projectReducer,
  error: errorReducer,
  auth: authReducer
})
