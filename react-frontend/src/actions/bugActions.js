import axios from 'axios'
import { GET_BUGS, ADD_BUG, DELETE_BUG, BUGS_LOADING, EDIT_BUG} from './types'
import {tokenConfig} from './authActions'
import {returnErrors} from './errorActions'

export const getBugs = (projectId) => dispatch => {
  dispatch(setBugsLoading())
  axios.get('/api/bugs/'+projectId)
  .then(res => {
    dispatch({
      type: GET_BUGS,
      payload: {bugs: res.data, projectId}
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
  }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
  })
}

export const editBug = (bug, projectId) => (dispatch, getState) => {
  axios.patch('/api/bugs/'+projectId, bug, tokenConfig(getState))
  .then(res => {
    dispatch({
      type: EDIT_BUG,
      payload: {bug: res.data, projectId}
    })
  }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
  })
}


export const setBugsLoading = () => {
  return {
    type: BUGS_LOADING
  }
}
