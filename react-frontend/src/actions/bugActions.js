import axios from 'axios'
import { GET_BUGS, ADD_BUG, DELETE_BUG, BUGS_LOADING} from './types'
import {tokenConfig} from './authActions'
import {returnErrors} from './errorActions'

export const getBugs = (projectId) => dispatch => {
  dispatch(setBugsLoading())
  axios.get('/api/bugs/'+projectId)
  .then(res => {
    dispatch({
      type: GET_BUGS,
      payload: {bugs: res.data.bugs, project_users: res.data.project_users, projectId}
    })
  }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
  })
}

export const deleteBug = (id,projectId) => (dispatch, getState) => {
  axios.delete('/api/bugs/'+id + '/'+projectId, tokenConfig(getState))
  .then(res => {
    dispatch({
      type: DELETE_BUG,
      payload: {id, projectId}
    })
  }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
  })
}

export const addBug = (bug, projectId) => (dispatch, getState) => {
  axios.post('/api/bugs/'+projectId, bug, tokenConfig(getState))
  .then(res => {
    dispatch({
      type: ADD_BUG,
      payload: {bug: res.data, projectId}
    })
  })
}

export const setBugsLoading = () => {
  return {
    type: BUGS_LOADING
  }
}
