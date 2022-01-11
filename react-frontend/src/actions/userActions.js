import axios from 'axios'
import { GET_ALL_USERS, USERS_LOADING, UPDATE_USER_INFO} from './types'
import {returnErrors} from './errorActions'
import bcrypt from "bcryptjs";
import {tokenConfig} from './authActions'


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

export const updateUserInfo = ({name, email, password}) => (dispatch, getState) => {
  const body = JSON.stringify({name, email, password});

  axios.patch('/api/users', body, tokenConfig(getState))
  .then(res => dispatch({
    type: UPDATE_USER_INFO,
    payload: res.data
  })).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
  })
}

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  }
}
