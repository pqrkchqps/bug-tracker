import axios from 'axios'
import { GET_PROJECT_USERS, ADD_PROJECT_USER, DELETE_PROJECT_USER, PROJECT_USERS_LOADING, UPDATE_PROJECT_USERS} from '../actions/types'
import {tokenConfig} from './authActions'
import {returnErrors} from './errorActions'

export const getProjectUsers = (projectId) => dispatch => {
  dispatch(setProjectUsersLoading())
  axios.get('/api/project_users/'+projectId)
  .then(res => {
    dispatch({
      type: GET_PROJECT_USERS,
      payload: {projectUsers: res.data, projectId}
    })
  }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
  })
}

export const deleteProjectUser = (id, projectId) => (dispatch, getState) => {
  axios.delete('/api/project_users/'+projectId+'/'+id, tokenConfig(getState))
  .then(res => {
    dispatch({
      type: DELETE_PROJECT_USER,
      payload: res.data.id
    })
  }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
  })
}

export const addProjectUser = (userId, projectId) => (dispatch, getState) => {
  axios.post('/api/project_users/'+projectId+'/add/'+userId, {}, tokenConfig(getState))
  .then(res => {
    dispatch({
      type: ADD_PROJECT_USER,
      payload: res.data
    })
  }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
  })
}

export const updateProjectUsers = (modifiedPermissions, projectId) => (dispatch, getState) => {
  dispatch(setProjectUsersLoading())
  axios.patch('/api/project_users/update/'+projectId, modifiedPermissions, tokenConfig(getState))
  .then(res => {
    dispatch({
      type: UPDATE_PROJECT_USERS,
      payload: res.data
    })
  }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
  })
}

export const setProjectUsersLoading = () => {
  return {
    type: PROJECT_USERS_LOADING
  }
}
