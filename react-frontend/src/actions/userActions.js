import axios from 'axios'
import { GET_ALL_USERS, USERS_LOADING} from './types'
import {returnErrors} from './errorActions'

export const getAllUsers = () => (dispatch) => {
  dispatch(setUsersLoading())
  axios.get('/api/users')
  .then(res => {
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data
    })
  }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
  })
}

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  }
}
