import { combineReducers } from 'redux'
import bugReducer from './bugReducer'


export default combineReducers({
  bug: bugReducer
})
