import axios from 'axios'
import { GET_BUGS, ADD_BUG, DELETE_BUG, BUGS_LOADING} from './types'

export const getBugs = () => dispatch => {
  dispatch(setBugsLoading())
  axios.get('/api/bugs')
  .then(res => {
    dispatch({
      type: GET_BUGS,
      payload: res.data
    })
  })
}

export const deleteBug = (id) => dispatch => {
  axios.delete('/api/bugs/'+id)
  .then(res => {
    dispatch({
      type: DELETE_BUG,
      payload: id
    })
  })
}

export const addBug = (bug) => dispatch => {
  axios.post('/api/bugs', bug)
  .then(res => {
    dispatch({
      type: ADD_BUG,
      payload: res.data
    })
  })
}

export const setBugsLoading = () => {
  return {
    type: BUGS_LOADING
  }
}
